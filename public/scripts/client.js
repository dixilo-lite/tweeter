/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
const createTweetElement = (tweetData)=>{
  return $(`  
      <article class="tweet">
        <header>
          <img src ="${tweetData.user.avatars}" alt ="User Avatar">
          <h3>${tweetData.user.handle}</h3>
        </header>
        
        <p name="text" id="tweet-text">${tweetData.content.text}</p>
        
        <footer>
          <h5>${timeago.format(tweetData.created_at)}</h5>
          <div class="tweet-action">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
}
const $container= $('#tweets-container');
const renderTweets = (tweetData) => {
  

  for(const user of tweetData){
    const $tweetNode= createTweetElement(user);
    $container.prepend($tweetNode);
  }
}
 const loadTweets = () => {
  console.log("load tweets called");
  const tweetContainer = document.getElementById('tweets-container');
  tweetContainer.innerHTML= '';

  $.ajax({
    method:"GET",
    url:"/api/tweets",
    dataType:"json",
    success:(tweetData)=> {
      renderTweets(tweetData)
    },
  })
 }
 const isTweetValid = (text) => {
 

 if (text.length > 0 && text.length < 140 )
  {
    return true;
  } else if (text.length === 0 || text.length > 140) {
    return false;
  }

 }
 const invalidTweetAlert = (text) =>  {
  if(text.length === 0) {
    alert("Please enter text to tweet");
  }

  if(text.length > 140) {
    alert("You have gone over the character limit, please remove some chracters");
  }
 }

const $form = $(".new-tweet-container");

$form.on("submit", (event) => {
  event.preventDefault();
  const tweetText = $("#tweet-text").val().trim();
  if(isTweetValid(tweetText)) {
    console.log("form submitted");
    const formData = $form.serialize();
    console.log(formData);
    $.ajax({
      method:"POST",
      url:"/api/tweets",
      dataType:"json",
      data:formData,
      success:(tweetData) => {
      console.log("success");
      loadTweets();     
    },
    error:(error) =>
    {
      console.log("error occured");
      console.log(error);
    }
  });
  } else {
   invalidTweetAlert(tweetText);
  }
});

$(document).ready(() => {
  loadTweets();
});