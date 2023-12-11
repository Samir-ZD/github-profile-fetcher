import React, { useContext, useEffect } from 'react';
import GithubContext from '../context/github/GithubContext';
import { useParams, Link } from 'react-router-dom';
import { FaCodepen, FaUserFriends, FaUsers } from 'react-icons/fa';
import RepoList from '../repos/RepoList';
import { getUserRepos, searchUser } from '../context/github/GitHubActions';

function Profile() {
  const { user, loading, repos, dispatch } = useContext(GithubContext);
  const params = useParams();

  useEffect(() => {
    
    const getUserData = async () => {

      const userData = await searchUser(params.login)
      dispatch({ type: 'SEARCH_USER', payload: userData })

      const userRepos = await getUserRepos(params.login)
      await dispatch({ type: 'GET_USER_REPOS', payload: userRepos })
    }

    getUserData()
  }, []);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const { login, name, type, avatar_url, location, bio, blog, twitter_username, html_url, followers, following,
    public_repos, hireable } = user

  return (
    <div className="w-full mx-auto lg:w-10/12 space-y-8">
      <div>
        <Link to="/" className="btn btn-ghost">
          Back to search
        </Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-8">
        <div className="custom-card-image mb-6 md:mb-0">
          <div className="rounded-lg shadow-xl card image-full group-hover:shadow-none">
            <figure >
              <img src={avatar_url} alt={login} />
            </figure>
            <div className="card-body justify-end">
              <h2 className="card-title mb-0">{name}</h2>
              <p>{login}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl card-title">
              {name}
              <span className="ml-2 mr-1 badge badge-success">{type}</span>
              {hireable && (
                <span className="mx-1 badge badge-info">{hireable}</span>
              )}
            </h1>
            <p className="mt-2 text-base">{bio}</p>
            <div className="mt-4 card-actions">
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Github Profile
              </a>
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-base-100 stats">
            {location && (
              <div className="stat">
                <div className="stat-title text-md">Location:</div>
                <div className="text-lg stat-value">{location}</div>
              </div>
            )}
          </div>
          <div className="w-full rounded-lg shadow-md bg-base-100 stats">
            {blog && (
              <div className="stat">
                <div className="stat-title text-md">Website:</div>
                <div className="text-lg stat-value">
                  <a
                    href={`https://${blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    {blog}
                  </a>
                </div>
              </div>
            )}
            {twitter_username && (
              <div className="stat">
                <div className="stat-title text-md">Twitter:</div>
                <div className="text-lg stat-value">
                  <a
                    href={`https://twitter.com/${twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    {twitter_username}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className='text-3xl md:text-5xl' />
          </div>
          <div className="stat-title pr-5">
            <p>Followers: </p>
          </div>
          <div className="stat-value pr-5 text-3xl md:text-4xl">
            {followers}
          </div>
        </div>
      </div>
      <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUserFriends className='text-3xl md:text-5xl' />
          </div>
          <div className="stat-title pr-5">
            <p>Following: </p>
          </div>
          <div className="stat-value pr-5 text-3xl md:text-4xl">
            {following}
          </div>
        </div>
      </div>
      <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaCodepen className='text-3xl md:text-5xl' />
          </div>
          <div className="stat-title pr-5">
            <p>Public Repos: </p>
          </div>
          <div className="stat-value pr-5 text-3xl md:text-4xl">
            {public_repos}
          </div>
        </div>
      </div>
      <RepoList repos={repos} />
    </div>
  );
}

export default Profile;
