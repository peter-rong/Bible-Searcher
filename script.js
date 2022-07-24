var bible = '';
var number = 0;


form = document.getElementsByClassName("search_form")[0];

form.addEventListener('submit', event => {
    getVerse();
    event.preventDefault();
});


function getVerse(){

    let chapter = document.getElementById("chapter");
    let verse = document.getElementById("verse");

    let chapterNumber = chapter.value;
    let verseNumber = verse.value;

    chapter.value = '';
    verse.value = '';

    if(chapterNumber ==''){
        console.log("no chapter number");
        document.getElementById('verse_text').innerHTML = 'You forgot to input a chapter number, please try again';
        document.getElementById('clear_verse').style.display = 'none';
        return;
    }

    if(verseNumber == ''){
        console.log("no verse number");
        document.getElementById('verse_text').innerHTML = 'You forgot to input a verse number, please try again';
        document.getElementById('clear_verse').style.display = 'none';
        return;
    }

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {

        if(this.readyState == 4 &&this.status == 404){
            document.getElementById('verse_text').innerHTML = 'The chapter number and verse number you entered are invalid, try again.';
        }

        else if (this.readyState == 4 && this.status == 200) {
            
            var obj = JSON.parse(this.responseText)
            console.log(obj.text);
            document.getElementById('verse_text').innerHTML = obj.text;
            document.getElementById('clear_verse').style.display = 'block';
            chapter.value = '';
            verse.value = '';
        }
    }

    var url = 'https://www.abibliadigital.com.br/api/verses/acf/'+bible+'/'+chapterNumber +'/'+verseNumber;
    xhttp.open("GET", url, true);
    xhttp.send();

}

function clearVerse(){

    document.getElementById('verse_text').innerHTML = '';
    document.getElementById('clear_verse').style.display = 'none';

}

function openbible(i) {

    number = i;

    if(number == 0){
        bible = 'gn'
    }

    else if(number == 1){
        bible = 'is'
    }

    else if(number == 2){
        bible = 'jr'
    }

    else{
        console.log('Incorrect input');
    }

    document.getElementsByClassName('intro')[0].style.display = 'none';
    document.getElementsByClassName('list_container')[0].style.display = 'none';
    document.getElementsByClassName('search_form')[0].style.display = 'block';
    document.getElementsByClassName('bible_verse')[0].style.display = 'block';
    document.getElementsByClassName('bible')[number].style.display = 'block';

    console.log('successfully opened book '+ bible);

}

function home(){

    document.getElementsByClassName('intro')[0].style.display = 'block';
    document.getElementsByClassName('list_container')[0].style.display = 'block';
    document.getElementsByClassName('search_form')[0].style.display = 'none';
    document.getElementsByClassName('bible_verse')[0].style.display = 'none';
    document.getElementsByClassName('bible')[number].style.display = 'none';

    console.log('successfully closed book '+bible+' and went back to main page');

    bible = '';
    number = 0

}