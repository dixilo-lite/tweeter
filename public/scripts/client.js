/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData)=>{
  return $(`  
      <article class="tweet">
        <header>
          <img src ="${tweetData.user.avatars}" alt ="User Avatar">
          <h3>${escape(tweetData.user.handle)}</h3>
        </header>
        
        <p name="text" id="tweet-text">${escape(tweetData.content.text)}</p>
        
        <footer>
          <h5>${escape(timeago.format(tweetData.created_at))}</h5>
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
  const alertText = $('.error-message');
  alertText.hide();
  if(text.length === 0) {
    alertText.text("Please enter text to tweet");
    alertText.slideDown();

    //alert("Please enter text to tweet");
  }else if(text.length > 140) {
    alertText.text("You have gone over the character limit, please remove some characters");
    alertText.slideDown();
    //alert("You have gone over the character limit, please remove some chracters");
  } 
 }

const $form = $(".new-tweet-container");

$form.on("submit", (event) => {
  console.log("Form submit event triggered"); // Add this to check

  event.preventDefault();
  const tweetText = $("#tweet-text").val().trim();
  const alertText = $('.error-message');
  if(isTweetValid(tweetText)) {
    alertText.hide();
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
  $('#tweet-text').val('');
});

$(document).ready(() => {
  console.log("JS loaded)");
  loadTweets();
});