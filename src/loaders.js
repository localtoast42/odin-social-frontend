import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export async function userLoader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${API_URL}/users/self`, { 
    mode: "cors",
    headers: { 
      'Authorization': accessToken,
      'X-Refresh': refreshToken,
    }
  });

  const newAccessToken = response.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (response.status == 401) {
    return redirect('/login')
  }
  
  const user = await response.json();

  return { user };
}

export async function userProfileLoader({ params }) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${API_URL}/users/${params.userId}`, { 
    mode: "cors",
    headers: { 
      'Authorization': accessToken,
      'X-Refresh': refreshToken,
    }
  });

  const newAccessToken = response.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (response.status == 401) {
    return redirect('/login')
  }
  
  const profile = await response.json();

  return { profile };
}

export async function userSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const queryUrl = new URL(`${API_URL}/users`);

  if (q) {
    queryUrl.searchParams.append('q', q);
  }

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(queryUrl, { 
      mode: "cors",
      headers: { 
        'Authorization': accessToken,
        'X-Refresh': refreshToken,
      }
    })

  const newAccessToken = response.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (response.status == 401) {
    return redirect('/login')
  }
  
  const users = await response.json();

  return { users, q };
}

export async function postLoader({ params }) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [postResponse, commentsResponse] = await Promise.all([
    fetch(`${API_URL}/posts/${params.postId}`, { 
      mode: "cors",
      headers: { 
        'Authorization': accessToken,
        'X-Refresh': refreshToken,
      }
    }),
    fetch(`${API_URL}/posts/${params.postId}/comments`, { 
      mode: "cors",
      headers: { 
        'Authorization': accessToken,
        'X-Refresh': refreshToken,
      }
    })
  ]);

  const newAccessToken = postResponse.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (postResponse.status == 401) {
    return redirect('/login')
  }
  
  const post = await postResponse.json();
  const comments = await commentsResponse.json();

  return { post, comments };
}

export async function recentFeedLoader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${API_URL}/posts?limit=10`, { 
    mode: "cors",
    headers: { 
      'Authorization': accessToken,
      'X-Refresh': refreshToken,
    }
  });

  const newAccessToken = response.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (response.status == 401) {
    return redirect('/login')
  }
  
  const posts = await response.json();

  return { posts };
}

export async function followingFeedLoader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${API_URL}/posts/following`, { 
    mode: "cors",
    headers: { 
      'Authorization': accessToken,
      'X-Refresh': refreshToken,
    }
  });

  const newAccessToken = response.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (response.status == 401) {
    return redirect('/login')
  }
  
  const posts = await response.json();

  return { posts };
}

export async function profileFeedLoader({ params }) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${API_URL}/users/${params.userId}/posts`, { 
    mode: "cors",
    headers: { 
      'Authorization': accessToken,
      'X-Refresh': refreshToken,
    }
  });

  const newAccessToken = response.headers.get('x-access-token');

  if (newAccessToken) {
    localStorage.setItem("accessToken", newAccessToken);
  }

  if (response.status == 401) {
    return redirect('/login')
  }
  
  const posts = await response.json();

  return { posts };
}