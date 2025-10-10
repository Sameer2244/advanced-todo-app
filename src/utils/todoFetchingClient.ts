export default async function getProjects() {
  const res = await fetch(`/api/projects`, {
    credentials: "include",
    cache: "no-store",
  });
  const data = await res.json();

  return data?.projects;
}
