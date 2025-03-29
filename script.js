function toggleAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-theme-d1";
    } else {
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
  }
  
function postStatus() {
      const statusText = document.querySelector('.w3-padding[contenteditable="true"]').textContent;
      const newPostsContainer = document.getElementById('newPosts');
      const imageUpload = document.getElementById('imageUpload');
      const imageFile = imageUpload.files[0];
  
      let imageHTML = '';
      if (imageFile) {
          const reader = new FileReader();
          reader.onload = function (e) {
              imageHTML = `<img src="${e.target.result}" style="width:100%" class="w3-margin-bottom">`;
              createNewPost(statusText, imageHTML, newPostsContainer);
          }
          reader.readAsDataURL(imageFile);
      } else {
          createNewPost(statusText, imageHTML, newPostsContainer);
      }
  }
  
  function createNewPost(statusText, imageHTML, newPostsContainer) {
      const postId = 'post-' + Date.now(); // Generate unique ID for new post
      const newPostDiv = document.createElement('div');
      newPostDiv.classList.add('w3-container', 'w3-card', 'w3-white', 'w3-round', 'w3-margin');
      newPostDiv.innerHTML = `
          <br>
          <img src="https://www.w3schools.com/w3images/avatar3.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
          <span class="w3-right w3-opacity">Just now</span>
          <h4>You</h4><br>
          <hr class="w3-clear">
          <p>${statusText}</p>
          ${imageHTML}
          <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom" data-post-id="${postId}">
              <i class="fa fa-thumbs-up"></i> <span class="like-count">0</span> Like
          </button>
          <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom commentButton" data-post="${postId}">
              <i class="fa fa-comment"></i> Comment
          </button>
          <div id="comments-${postId}" class="w3-container">
              <!-- Comments will be added here dynamically -->
          </div>
          <div class="w3-row w3-margin-bottom comment-input-row" style="display: none;">
              <div class="w3-col s9">
                  <input type="text" id="commentInput-${postId}" class="w3-input w3-border" placeholder="Add a comment">
              </div>
              <div class="w3-col s3">
                  <button class="w3-button w3-theme commentSubmit" data-post="${postId}">Submit</button>
              </div>
          </div>
      `;
  
      newPostsContainer.insertBefore(newPostDiv, newPostsContainer.firstChild);
      
      // Add event listener for the new like button
      const likeButton = newPostDiv.querySelector('.w3-theme-d1');
      likeButton.addEventListener('click', function() {
          const count = this.querySelector('.like-count');
          const liked = this.innerHTML.includes('Liked');
          
          if (liked) {
              this.innerHTML = `<i class="fa fa-thumbs-up"></i> <span class="like-count">${parseInt(count.textContent) - 1}</span> Like`;
          } else {
              this.innerHTML = `<i class="fa fa-thumbs-up"></i> <span class="like-count">${parseInt(count.textContent) + 1}</span> Liked`;
          }
      });
  
      // Add event listeners for comment functionality
      const commentButton = newPostDiv.querySelector('.commentButton');
      const commentInput = newPostDiv.querySelector('.comment-input-row');
      commentButton.addEventListener('click', function() {
          commentInput.style.display = commentInput.style.display === 'none' ? 'flex' : 'none';
      });
  
      const commentSubmit = newPostDiv.querySelector('.commentSubmit');
      commentSubmit.addEventListener('click', function() {
          const input = document.getElementById(`commentInput-${postId}`);
          const commentsDiv = document.getElementById(`comments-${postId}`);
          const commentText = input.value;
  
          if (commentText.trim() !== '') {
              const newCommentDiv = document.createElement('div');
              newCommentDiv.classList.add('w3-container', 'w3-left-align', 'w3-padding');
              newCommentDiv.innerHTML = `
                  <hr>
                  <div class="w3-row">
                      <div class="w3-col m1 l1 w3-center">
                          <img src="https://www.w3schools.com/w3images/avatar3.png" class="w3-circle" style="height:40px;width:40px" alt="Avatar">
                      </div>
                      <div class="w3-col m11 l11">
                          <h4 class="w3-opacity" style="margin:0">You</h4>
                          <p>${commentText}</p>
                      </div>
                  </div>`;
              commentsDiv.appendChild(newCommentDiv);
              input.value = '';
          }
      });
  
      // Add enter key listener for the new comment input
      const commentInputField = newPostDiv.querySelector('.w3-input.w3-border');
      commentInputField.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();
              const commentsDiv = document.getElementById(`comments-${postId}`);
              const commentText = this.value;
  
              if (commentText.trim() !== '') {
                  const newCommentDiv = document.createElement('div');
                  newCommentDiv.classList.add('w3-container', 'w3-left-align', 'w3-padding');
                  newCommentDiv.innerHTML = `
                      <hr>
                      <div class="w3-row">
                          <div class="w3-col m1 l1 w3-center">
                              <img src="https://www.w3schools.com/w3images/avatar3.png" class="w3-circle" style="height:40px;width:40px" alt="Avatar">
                          </div>
                          <div class="w3-col m11 l11">
                              <h4 class="w3-opacity" style="margin:0">You</h4>
                              <p>${commentText}</p>
                          </div>
                      </div>`;
                  commentsDiv.appendChild(newCommentDiv);
                  this.value = '';
              }
          }
      });
  }
  
  // Like button functionality
  function likePost(button, postId) {
      const likeCountSpan = document.getElementById(`likeCount${postId}`);
      let likeCount = parseInt(likeCountSpan.textContent);
      let liked = button.innerHTML.includes('Liked');
  
      if (liked) {
          button.innerHTML = `<i class="fa fa-thumbs-up"></i> <span id="likeCount${postId}">${likeCount - 1}</span> Like`;
      } else {
          button.innerHTML = `<i class="fa fa-thumbs-up"></i> <span id="likeCount${postId}">${likeCount + 1}</span> Liked`;
      }
  }
  
  // Comment button functionality
  function commentPost(postId) {
      const commentInput = document.getElementById(`commentInput${postId}`);
      const commentText = commentInput.value;
      if (commentText.trim() !== "") {
          const commentsDiv = document.getElementById(`comments${postId}`);
          const newCommentDiv = document.createElement('div');
          newCommentDiv.classList.add('w3-container', 'w3-left-align', 'w3-padding');
          newCommentDiv.innerHTML = `
              <hr>
              <div class="w3-row">
                  <div class="w3-col m1 l1 w3-center">
                      <img src="https://www.w3schools.com/w3images/avatar3.png" class="w3-circle" style="height:40px;width:40px" alt="Avatar">
                  </div>
                  <div class="w3-col m11 l11">
                      <h4 class="w3-opacity" style="margin:0">You</h4>
                      <p>${commentText}</p>
                  </div>
              </div>`;
          commentsDiv.appendChild(newCommentDiv);
          commentInput.value = ''; // Clear the input field
      } else {
          alert("Please enter a comment.");
      }
  }
  
  // Info button functionality (Upcoming Events)
  function showEventInfo() {
      document.getElementById('eventModal').style.display = 'block';
  }
  
  // Close modal when clicking outside
  window.onclick = function(event) {
      const modal = document.getElementById('eventModal');
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }
  
  // Accept friend request functionality
  function acceptFriendRequest(button) {
    // In a real application, you would send a request to the server to accept the friend request
    // For this example, we'll just update the UI
    const friendRequestDiv = button.closest('.w3-card');
    friendRequestDiv.innerHTML = "<p>Friend request accepted!</p>";
  }
  
  // Decline friend request functionality
  function declineFriendRequest(button) {
    // In a real application, you would send a request to the server to decline the friend request
    // For this example, we'll just update the UI
    const friendRequestDiv = button.closest('.w3-card');
    friendRequestDiv.innerHTML = "<p>Friend request declined.</p>";
  }
  
  // Used to toggle the menu on smaller screens when clicking on the menu button
  function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
  // Theme toggle functionality
  function toggleTheme() {
      const body = document.body;
      const themeButton = document.getElementById('themeToggle');
      const icon = themeButton.querySelector('i');
      
      body.classList.toggle('dark-theme');
      
      // Toggle moon/sun icon
      if (body.classList.contains('dark-theme')) {
          icon.classList.remove('fa-moon-o');
          icon.classList.add('fa-sun-o');
          localStorage.setItem('theme', 'dark');
      } else {
          icon.classList.remove('fa-sun-o');
          icon.classList.add('fa-moon-o');
          localStorage.setItem('theme', 'light');
      }
  }
  
  // Add event listeners after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    // Accordion buttons
    document.querySelector('button[onclick="myFunction(\'Demo1\')"]').addEventListener('click', function() {
        toggleAccordion('Demo1');
    });
    document.querySelector('button[onclick="myFunction(\'Demo2\')"]').addEventListener('click', function() {
        toggleAccordion('Demo2');
    });
    document.querySelector('button[onclick="myFunction(\'Demo3\')"]').addEventListener('click',  function() {
        toggleAccordion('Demo3');
    });
  
    // Post button
    document.querySelector('.w3-button.w3-theme').addEventListener('click', postStatus);
  
    // Like buttons (select all like buttons and add listener to each)
    const likeButtons = document.querySelectorAll('.w3-button.w3-theme-d1');
    likeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            likePost(button, index + 1); // Pass the post ID to the likePost function
        });
    });
  
    // Comment buttons
    const commentButtons = document.querySelectorAll('.commentButton');
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.post;
            const commentInputRow = document.querySelector(`#comments${postId}`).nextElementSibling;
            commentInputRow.style.display = commentInputRow.style.display === 'none' ? 'flex' : 'none';
        });
    });
  
    // Comment submit buttons
    const commentSubmitButtons = document.querySelectorAll('.commentSubmit');
    commentSubmitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.post;
            commentPost(postId);
        });
    });
  
    // Add enter key listener for comment inputs
    const commentInputs = document.querySelectorAll('.w3-input.w3-border');
    commentInputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const postId = this.id.split('commentInput')[1];
                commentPost(postId);
            }
        });
    });
  
    // Info button (Upcoming Events)
    document.querySelector('.w3-button.w3-block.w3-theme-l4').addEventListener('click', showEventInfo);
  
    // Accept/Decline friend request buttons
    const acceptButtons = document.querySelectorAll('.w3-button.w3-green');
    acceptButtons.forEach(button => {
        button.addEventListener('click', () => acceptFriendRequest(button));
    });
  
    const declineButtons = document.querySelectorAll('.w3-button.w3-red');
    declineButtons.forEach(button => {
        button.addEventListener('click', () => declineFriendRequest(button));
    });
  
    // Theme toggle button
    const themeButton = document.getElementById('themeToggle');
    themeButton.addEventListener('click', toggleTheme);
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = themeButton.querySelector('i');
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
    }
  });
  