export default function rankRepos(repos) {

  
  return repos
    .map((repo) => {
      const score =
      repo.contributors * 3 +   
      repo.forks * 2 +          
      repo.stars * 3 +      //will look cool af in your resume hehe
      repo.issues * 1 +
      repo.size * -0.01    //say no to big ahh repos 

      return {
        ...repo,
        score,
      };
    })
    .sort((a, b) => b.score - a.score); // sort descending by score
}
