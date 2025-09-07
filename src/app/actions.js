// actions.js
export async function getRepoData(repoFullName) {
  const [owner, repoName] = repoFullName.split('/');
  if (!owner || !repoName) return null;

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
    const repoData = await repoRes.json();

    const contribRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/contributors?per_page=1&anon=true`
    );

    const contribCount = contribRes.headers.get('link')
      ? parseInt(contribRes.headers.get('link').match(/&page=(\d+)>; rel="last"/)?.[1] || 1)
      : (await contribRes.json()).length;

    return {
      name: repoFullName,
      size: repoData.size || 0,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      issues: repoData.open_issues_count || 0,
      contributors: contribCount || 0,
      language: repoData.language || "Unknown",
      url: repoData.html_url 
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
