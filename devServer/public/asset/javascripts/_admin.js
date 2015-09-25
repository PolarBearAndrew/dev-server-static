$(document).ready( function(){

  $('html, body').on('click', '#build', function(){

    $.ajax({
      url: 'http://localhost:8080/build',
      type: 'POST',

      success: function( result ){
        console.log('result', result)
        $('#result').html( '建立頁面：' + JSON.stringify(result) );
      },

      fail: function( err ){
        $('#result').html( err );
      }

    }); // ajax end

  }); // #build click end

}); // doc ready end