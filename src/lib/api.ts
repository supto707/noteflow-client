import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export type Page = {
  id: string;
  workspace_id: string;
  title: string;
  icon: string | null;
  is_published: boolean;
  is_trashed: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Block = {
  id: string;
  page_id: string;
  type: string;
  content: string;
  position: number;
  created_by: string;
  meta?: Record<string, any>;
};

export type Database = {
  id: string;
  workspace_id: string;
  name: string;
  icon: string | null;
  created_by: string;
  created_at: string;
};

export type DatabaseRow = {
  id: string;
  database_id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  due: string;
  tag: string;
  position: number;
};

export type DatabaseColumn = {
  id: string;
  database_id: string;
  name: string;
  type: string;
  options: any;
  position: number;
};

export type WikiPage = {
  id: string;
  workspace_id: string;
  parent_page_id: string | null;
  title: string;
  icon: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore body parse errors
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

const get = <T,>(path: string) => request<T>(path);
const post = <T,>(path: string, body: unknown) =>
  request<T>(path, { method: "POST", body: JSON.stringify(body) });
const put = <T,>(path: string, body: unknown) =>
  request<T>(path, { method: "PUT", body: JSON.stringify(body) });
const patch = <T,>(path: string, body: unknown) =>
  request<T>(path, { method: "PATCH", body: JSON.stringify(body) });
const del = <T,>(path: string) => request<T>(path, { method: "DELETE" });

export async function bootstrapAccount(name: string) {
  try {
    await post("/api/auth/bootstrap", { name });
    return { error: null };
  } catch (err: any) {
    console.error("bootstrapAccount error:", err);
    return { error: err as Error };
  }
}

export async function getCurrentUser() {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
  };
}

export async function getUserProfile(userId: string) {
  try {
    return (await get<UserProfile | null>(`/api/users/${userId}`)) || null;
  } catch (err) {
    console.error("getUserProfile error:", err);
    return null;
  }
}

export async function getUserWorkspace(_userId: string) {
  try {
    const data = await get<{ workspaceId: string | null }>("/api/workspaces/mine");
    return data.workspaceId || undefined;
  } catch (err) {
    console.error("getUserWorkspace error:", err);
    return undefined;
  }
}

export async function getPages(workspaceId: string) {
  try {
    return (await get<Page[]>(`/api/pages?workspaceId=${workspaceId}`)) || [];
  } catch (err) {
    console.error("getPages error:", err);
    return [];
  }
}

export async function getPageById(pageId: string) {
  try {
    return (await get<(Page & { blocks: Block[] }) | null>(`/api/pages/${pageId}`)) || null;
  } catch (err) {
    console.error("getPageById error:", err);
    return null;
  }
}

export async function createPage(workspaceId: string, userId: string, title: string) {
  try {
    const data = await post<{ id: string }>("/api/pages", { workspaceId, title });
    return data.id as string | undefined;
  } catch (err) {
    console.error("createPage error:", err);
    return undefined;
  }
}

export async function getDatabases(workspaceId: string) {
  try {
    return (
      (await get<
        (Database & { database_columns: DatabaseColumn[]; database_records: any[] })[]
      >(`/api/databases?workspaceId=${workspaceId}`)) || []
    );
  } catch (err) {
    console.error("getDatabases error:", err);
    return [];
  }
}

export async function getWikiPages(workspaceId: string) {
  try {
    return (await get<WikiPage[]>(`/api/pages/wiki?workspaceId=${workspaceId}`)) || [];
  } catch (err) {
    console.error("getWikiPages error:", err);
    return [];
  }
}

export async function getRecentActivity(workspaceId: string) {
  try {
    return (
      (await get<
        { id: string; title: string; updated_at: string; created_by: string }[]
      >(`/api/pages/recent?workspaceId=${workspaceId}`)) || []
    );
  } catch (err) {
    console.error("getRecentActivity error:", err);
    return [];
  }
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    await patch(`/api/users/${userId}`, updates);
    return { error: null };
  } catch (err: any) {
    return { error: err as Error };
  }
}

export type DatabaseRecordWithValues = {
  id: string;
  database_id: string;
  position: number;
  created_at: string;
  values: Record<string, string>;
};

export async function renameDatabase(databaseId: string, name: string) {
  await patch(`/api/databases/${databaseId}`, { name });
}

export async function getDatabaseRecords(databaseId: string) {
  try {
    const data = await get<{
      columns: DatabaseColumn[];
      records: DatabaseRecordWithValues[];
    }>(`/api/databases/${databaseId}/records`);
    return {
      columns: data.columns || [],
      records: (data.records || []).map(r => ({ ...r, values: r.values || {} })),
    };
  } catch (err) {
    console.error("getDatabaseRecords error:", err);
    return { columns: [], records: [] as DatabaseRecordWithValues[] };
  }
}

export async function replacePageBlocks(
  pageId: string,
  blocks: { type: string; content: string; position: number }[]
) {
  await put(`/api/pages/${pageId}/blocks`, { blocks });
}

export async function updatePageTitle(pageId: string, title: string) {
  await patch(`/api/pages/${pageId}`, { title });
}

export async function updateUserProfile(userId: string, name: string) {
  try {
    await patch(`/api/users/${userId}`, { name });
    return { error: null };
  } catch (err: any) {
    return { error: err as Error };
  }
}

export async function getTrashedPages(workspaceId: string) {
  try {
    return (await get<Page[]>(`/api/pages/trash?workspaceId=${workspaceId}`)) || [];
  } catch (err) {
    console.error("getTrashedPages error:", err);
    return [];
  }
}

export async function getInboxCount(_userId: string) {
  try {
    const data = await get<{ count: number }>("/api/inbox/count");
    return data.count || 0;
  } catch (err) {
    console.error("getInboxCount error:", err);
    return 0;
  }
}

export async function getInboxPages(_userId: string) {
  try {
    return (await get<Page[]>("/api/inbox/pages")) || [];
  } catch (err) {
    console.error("getInboxPages error:", err);
    return [];
  }
}

export async function trashPage(pageId: string) {
  await patch(`/api/pages/${pageId}`, { is_trashed: true });
}

export async function restorePage(pageId: string) {
  await patch(`/api/pages/${pageId}`, { is_trashed: false });
}

export async function deletePagePermanently(pageId: string) {
  await del(`/api/pages/${pageId}`);
}

export async function getFavoritedPages(workspaceId: string) {
  try {
    return (await get<Page[]>(`/api/pages/favorites?workspaceId=${workspaceId}`)) || [];
  } catch (err) {
    console.error("getFavoritedPages error:", err);
    return [];
  }
}

export async function createDatabase(workspaceId: string, userId: string, name: string) {
  try {
    const data = await post<{ id: string }>("/api/databases", { workspaceId, name });
    return data.id as string | undefined;
  } catch (err) {
    console.error("createDatabase error:", err);
    return undefined;
  }
}

export async function createDatabaseColumn(databaseId: string, name: string, type: string, position: number) {
  try {
    const data = await post<{ id: string }>(`/api/databases/${databaseId}/columns`, { name, type, position });
    return data.id as string | undefined;
  } catch (err) {
    console.error("createDatabaseColumn error:", err);
    return undefined;
  }
}

export async function createDatabaseRecord(databaseId: string, userId: string, position: number) {
  try {
    const data = await post<{ id: string }>(`/api/databases/${databaseId}/records`, { position });
    return data.id as string | undefined;
  } catch (err) {
    console.error("createDatabaseRecord error:", err);
    return undefined;
  }
}

export async function deleteDatabaseRecord(recordId: string) {
  await del(`/api/databases/records/${recordId}`);
}

export async function deleteDatabaseColumn(columnId: string) {
  await del(`/api/databases/columns/${columnId}`);
}

export async function setRecordValue(recordId: string, columnId: string, value: string) {
  await put("/api/databases/values", { recordId, columnId, value });
}

export async function updatePageIcon(pageId: string, icon: string | null) {
  await patch(`/api/pages/${pageId}`, { icon });
}

export async function togglePagePin(pageId: string, currentIcon: string | null) {
  const newIcon = currentIcon === "⭐" ? null : "⭐";
  await updatePageIcon(pageId, newIcon);
}

export async function createBlock(pageId: string, userId: string, type: string, content: string, position: number) {
  try {
    const data = await post<{ id: string }>(`/api/pages/${pageId}/blocks`, { type, content, position });
    return data.id as string | undefined;
  } catch (err) {
    console.error("createBlock error:", err);
    return undefined;
  }
}
