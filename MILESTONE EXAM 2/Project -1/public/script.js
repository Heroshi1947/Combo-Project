// script.js

// Get the DOM elements
const addBlogBtn = document.getElementById('addBlogBtn');
const addBlogModal = document.getElementById('addBlogModal');
const addBlogForm = document.getElementById('addBlogForm');
const blogList = document.getElementById('blogList');

// Open the add blog modal when the "+" button is clicked
addBlogBtn.addEventListener('click', function() {
  addBlogModal.style.display = 'block';
});

// Close the add blog modal when the close button is clicked
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    addBlogModal.style.display = 'none';
  }
});

// Handle the form submission
addBlogForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get the form values
  const title = document.getElementById('title').value;
  const posterInput = document.getElementById('poster');
  const description = document.getElementById('description').value;
  const content = document.getElementById('content').value;

  // Check if a file was selected
  if (posterInput.files.length > 0) {
    const file = posterInput.files[0];
    const poster = URL.createObjectURL(file);

    // Create the blog object
    const blog = {
      title: title,
      poster: poster,
      description: description,
      content: content
    };

    // Get the existing blogs from localStorage or initialize an empty array
    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Add the new blog to the existing blogs array
    existingBlogs.push(blog);

    // Update the blogs in localStorage
    localStorage.setItem('blogs', JSON.stringify(existingBlogs));

    // Reset the form and close the modal
    addBlogForm.reset();
    addBlogModal.style.display = 'none';

    // Render the blogs
    renderBlogs();
  } else {
    alert('Please select an image for the poster.');
  }
});

// Function to render the blogs
function renderBlogs() {
  // Clear the existing blog list
  blogList.innerHTML = '';

  // Get the blogs from localStorage
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  // Render each blog
  blogs.forEach(function(blog) {
    // Create the card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Create the card content
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    cardImage.src = blog.poster;
    cardImage.alt = blog.title;

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = blog.title;

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-description');
    cardDescription.textContent = blog.description;

    // Append the card content to the card element
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);

    // Add an event listener to open the blog.html when the card is clicked
    card.addEventListener('click', function() {
      // Store the blog data in sessionStorage
      localStorage.setItem('currentBlog', JSON.stringify(blog));

      // Redirect to blog.html
      window.location.href = 'blog.html';
    });

    // Append the card to the blog list
    blogList.appendChild(card);
  });
}

// Call the renderBlogs function to initially render the blogs
renderBlogs();