$(document).ready(()=>{

  $("#tweet-text").on('input', function(){
    const maxLength =140;
    const textLength = $(this).val().length;
    const remainingChars =maxLength - textLength;
    const counterElement = $(this).closest('form').find('.counter');
    counterElement.text(remainingChars);

    if(remainingChars < 0)
    {
      counterElement.css('color', 'red');
    } else {
      counterElement.css('color', 'black');
    }

});


});
