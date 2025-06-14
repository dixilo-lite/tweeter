/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1736200735747
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1736287135747
  }
]
 
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

const renderTweets = (tweetData) => {
  const $container= $('#tweets-container');

  for(const user of tweetData){
    const $tweetNode= createTweetElement(user);
    $container.prepend($tweetNode);
  }
}
 const loadTweets = () => {
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
  } else {
    return false;
  }

 }


const $form = $(".new-tweet-container");

$form.on("submit", (event) => {
  event.preventDefault();
  const textLength = $("#tweet-text").val().trim().length;
  if(isTweetValid(textLength)) {
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
      loadTweets(tweetData);     
    },
    error:(error) =>
    {
      console.log("error occured");
      console.log(error);
    }
  });
  } else {
    if (text.length === 0){
    
     alert("Please enter text to tweet");
  
    }
    if (text.length > 140) {
    
    alert("You have gone over the character limit, please remove some chracters");

    }
  }
});

loadTweets(tweetData);