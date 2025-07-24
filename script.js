const API_URL = 'https://dorama-backend.onrender.com'; // ЗАМЕНИ на свой адрес

const search = document.getElementById("search");
const genreFilter = document.getElementById("genreFilter");
const countryFilter = document.getElementById("countryFilter");
const yearFilter = document.getElementById("yearFilter");
const showList = document.getElementById("showList");

// === Загрузка и фильтрация шоу ===
async function loadShows() {
  const params = new URLSearchParams();

  if (search.value) params.append('search', search.value);
  if (genreFilter.value) params.append('genre', genreFilter.value);
  if (countryFilter.value) params.append('country', countryFilter.value);
  if (yearFilter.value) params.append('year', yearFilter.value);

  try {
    const res = await fetch(`${API_URL}/shows?${params.toString()}`);
    const shows = await res.json();

    showList.innerHTML = "";
    if (shows.length === 0) {
      showList.innerHTML = "<p>No results found.</p>";
      return;
    }

    shows.forEach(item => {
      const div = document.createElement("div");
      div.className = "show-item";
      div.innerHTML = `
        <strong>${item.title}</strong> (${item.year})<br>
        ${item.genre} | ${item.country}<br>
        ${item.description}
      `;
      div.onclick = () => showComments(item.id, item.title);
      showList.appendChild(div);
    });

  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    showList.innerHTML = "<p>Ошибка загрузки.</p>";
  }
}

// === Показать и отправить комментарии ===
async function showComments(showId, title) {
  document.getElementById("commentsSection").style.display = "block";
  document.querySelector("#commentsSection h2").textContent = `Comments for "${title}"`;

  const commentList = document.getElementById("commentList");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");

  // Загрузка комментариев
  try {
    const res = await fetch(`${API_URL}/comments/${showId}`);
    const comments = await res.json();
    commentList.innerHTML = "";

    if (comments.length === 0) {
      commentList.innerHTML = "<p>No comments yet.</p>";
    } else {
      comments.forEach(c => {
        const p = document.createElement("p");
        p.textContent = `• ${c.content}`;
        commentList.appendChild(p);
      });
    }

    // Отправка нового комментария
    submitComment.onclick = async () => {
      const text = commentInput.value.trim();
      if (!text) return;

      const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show_id: showId, content: text })
      });

      if (res.ok) {
        commentInput.value = "";
        showComments(showId, title); // перезагрузка комментариев
      } else {
        alert("Ошибка отправки комментария");
      }
    };
  } catch (err) {
    commentList.innerHTML = "<p>Ошибка загрузки комментариев.</p>";
  }
}

// === Слушатели фильтров ===
search.oninput = genreFilter.onchange = countryFilter.onchange = yearFilter.onchange = loadShows;

// === Первая загрузка ===
loadShows();
