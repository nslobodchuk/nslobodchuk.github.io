(function(){

var origin = "http://slobodchuk.com";
var gadget = "/wishlist-bookmarklet";

var head = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel = 'stylesheet';
link.href = origin + gadget +'/css/style.css';
head.appendChild(link);

var link2  = document.createElement('link');
link2.rel = 'stylesheet';
link2.href = origin + gadget +'/css/font-awesome.min.css';
head.appendChild(link2);


var iframe = document.createElement("iframe");
iframe.setAttribute('style', 'display: none;')
iframe.setAttribute('class', 'wishlist-bookmarklet');
iframe.src = origin+gadget;
document.body.insertBefore(iframe, document.body.firstChild);

window.addEventListener('message', receiveMessage);

var WishlistBookmarkletData;

function receiveMessage(e){
	console.log('message received from iframe');
	if (e.origin!="http://slobodchuk.com") return;
	WishlistBookmarkletData = JSON.parse(e.data);
}


//Definining modal window and form for a new item

var LaunchButton = document.createElement('div');
LaunchButton.setAttribute('class', 'wishlist-bookmarklet button launch');
LaunchButton.innerHTML ='<i class="fa fa-plus" aria-hidden="true"></i>';

var ListButton = document.createElement('div');
ListButton.setAttribute('class', 'wishlist-bookmarklet button list');
ListButton.innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>';

var CancelButton = document.createElement('div');
CancelButton.setAttribute('class', 'wishlist-bookmarklet button cancel hidden');
CancelButton.appendChild(document.createTextNode('Cancel'));


var overlay = document.createElement('div');
overlay.setAttribute('class', 'wishlist-bookmarklet overlay hidden');

var form = document.createElement('div');
form.setAttribute('class', 'wishlist-bookmarklet form');

var FormTitle = document.createElement('h1');
FormTitle.appendChild(document.createTextNode('Add New Item to Your Wishlist'));


var TitleField = document.createElement('div');
TitleField.setAttribute('class', 'wishlist-bookmarklet form-field title');

var TitleInput = document.createElement('input');
TitleInput.setAttribute('class', 'wishlist-bookmarklet input');
TitleInput.setAttribute('placeholder', 'Type in the title of the item');

var TitleSelect = document.createElement('div');
TitleSelect.setAttribute('class', 'wishlist-bookmarklet button select-in-document');
TitleSelect.innerHTML = '<i class="fa fa-i-cursor" aria-hidden="true"></i>';

TitleField.appendChild(TitleInput);
TitleField.appendChild(TitleSelect);


var ImageField = document.createElement('div');
ImageField.setAttribute('class', 'wishlist-bookmarklet form-field image');

var ImageInput = document.createElement('input');
ImageInput.setAttribute('class', 'wishlist-bookmarklet input');
ImageInput.setAttribute('placeholder', 'Type in image url');

var ImageSelect = document.createElement('div');
ImageSelect.setAttribute('class', 'wishlist-bookmarklet button select-in-document');
ImageSelect.innerHTML = '<i class="fa fa-hand-pointer-o" aria-hidden="true"></i>';

ImageField.appendChild(ImageInput);
ImageField.appendChild(ImageSelect)


var CommentField = document.createElement('div');
CommentField.setAttribute('class', 'wishlist-bookmarklet form-field comment');

var CommentInput = document.createElement('textarea');
CommentInput.setAttribute('class', 'wishlist-bookmarklet input');
CommentInput.setAttribute('placeholder', 'Type in a comment');

var CommentSelect = document.createElement('div');
CommentSelect.setAttribute('class', 'wishlist-bookmarklet button select-in-document');
CommentSelect.innerHTML = '<i class="fa fa-i-cursor" aria-hidden="true"></i>';

CommentField.appendChild(CommentInput);
CommentField.appendChild(CommentSelect);



var SubmitButton = document.createElement('div');
SubmitButton.setAttribute('class', 'wishlist-bookmarklet button add-new-item');
SubmitButton.appendChild(document.createTextNode('Submit'));


form.appendChild(FormTitle);
form.appendChild(TitleField);
form.appendChild(ImageField);
form.appendChild(CommentField);
form.appendChild(SubmitButton);



var List = document.createElement('div');
List.setAttribute('class', 'wishlist-bookmarklet list');

var ListFilter =  document.createElement('input');
ListFilter.setAttribute('class', 'wishlist-bookmarklet filter');
ListFilter.addEventListener('input', filterData);

var FilterField = document.createElement('div');
FilterField.setAttribute('class', 'wishlist-bookmarklet filter-field');
FilterField.appendChild(ListFilter);


var SelectedItem = document.createElement('div');
SelectedItem.setAttribute('class', 'wishlist-bookmarklet selected-item');



var ListPagination = document.createElement('div');
ListPagination.setAttribute('class', 'wishlist-bookmarklet pagination');

function updateListPaginationData(){


	var data = {};
	var keys = [];



	for (var i = 0; i<=9;++i){
		keys.push(Object.keys(ListFilter.FilteredData)[i]);
	}

	keys.sort();

	keys.forEach(function(d){
		if(d!=undefined){
			data[d] = ListFilter.FilteredData[d];
		}
	});

	ListPagination.PaginationData = data;

}


function redrawPagination(){

	ListPagination.innerHTML='';

	Object.keys(ListPagination.PaginationData).forEach(function(k){

		ListPagination.appendChild(ListPaginationItem(k,ListPagination.PaginationData[k]));

	})
}

function redrawSelectedItem(){
	SelectedItem.innerHTML = '';

	if(SelectedItem.SelectedItemData){
	
		var ItemTitle = document.createElement('h1');
		ItemTitle.appendChild(document.createTextNode(SelectedItem.SelectedItemData.title));
		var ItemImage = document.createElement('img');
		ItemImage.setAttribute('src', SelectedItem.SelectedItemData.data.image);
		var ItemComment = document.createElement('p');
		ItemComment.appendChild(document.createTextNode(SelectedItem.SelectedItemData.data.comment));
		var ItemLink = document.createElement('a');
		ItemLink.setAttribute('href', SelectedItem.SelectedItemData.data.href);
		ItemLink.appendChild(document.createTextNode(SelectedItem.SelectedItemData.data.origin));
		var DeleteButton = document.createElement('div');
		DeleteButton.appendChild(document.createTextNode('Delete'));
		DeleteButton.setAttribute('class', 'wishlist-bookmarklet button delete-item');
		DeleteButton.addEventListener('click', removeItem);
	
		SelectedItem.appendChild(ItemTitle);
		SelectedItem.appendChild(ItemImage);
		SelectedItem.appendChild(ItemComment);
		SelectedItem.appendChild(ItemLink);
		SelectedItem.appendChild(DeleteButton);
		SelectedItem.setAttribute('class', 'wishlist-bookmarklet selected-item');
	} else {
		SelectedItem.setAttribute('class', 'wishlist-bookmarklet selected-item hidden');
	}

}

function ListPaginationItem(title, data) {
	var Div = document.createElement('div');
	Div.setAttribute('class', 'wishlist-bookmarklet pagination-container');
	Div.setAttribute('title', title);
	if(data.image!=undefined&&data.image!=""){
	var img = document.createElement('img');
	data.image!=undefined?img.setAttribute('src', data.image):'set defult src';
	} else {
		var img = document.createElement('p');
		img.appendChild(document.createTextNode('Image not set.'));
		img.setAttribute('class', 'wishlist-bookmarklet pagination-tab');
	}

	img.setAttribute('class', 'wishlist-bookmarklet pagination-tab');
	Div.appendChild(img);
	Div.itemData = {title: title, data: data};
	Div.addEventListener('click', function(e){
		SelectedItem.SelectedItemData = Div.itemData;
		redrawSelectedItem();
	})
	return Div;
}

List.appendChild(SelectedItem);
List.appendChild(FilterField);
List.appendChild(ListPagination);


function filterData(e){

	ListFilter.FilteredData = {};

	for(prop in WishlistBookmarkletData){



		if(prop.toLowerCase().indexOf(e.target.value.toLowerCase())>-1){
			ListFilter.FilteredData[prop] = WishlistBookmarkletData[prop];

			console.log(ListFilter.FilteredData[prop]);
		}

	}

	updateListPaginationData();
	redrawPagination();
}



document.getElementsByTagName('body')[0].appendChild(LaunchButton);
document.getElementsByTagName('body')[0].appendChild(ListButton);
document.getElementsByTagName('body')[0].appendChild(CancelButton);



document.getElementsByTagName('body')[0].appendChild(overlay);

///////////////////////////////
// Attaching event listeners //
///////////////////////////////

LaunchButton.addEventListener('click', function(){
	overlay.setAttribute('class', 'wishlist-bookmarklet overlay');
	LaunchButton.setAttribute('class', 'wishlist-bookmarklet button launch hidden');
	ListButton.setAttribute('class', 'wishlist-bookmarklet button list hidden');
	overlay.appendChild(form);
})

TitleSelect.addEventListener('click', function(){
	selectText(TitleInput);
});

CommentSelect.addEventListener('click', function(){
	selectText(CommentInput);
});

ImageSelect.addEventListener('click', function(){
	selectImage(ImageInput);
})

function selectText(input){
	overlay.setAttribute('class', 'wishlist-bookmarklet overlay hidden');
	CancelButton.setAttribute('class', 'wishlist-bookmarklet button cancel');
	

	selectText.storeSelection = function(e){
		if(e.target!=CancelButton){
			input.value = window.getSelection().toString();
			document.removeEventListener('mouseup', selectText.storeSelection);
			document.getElementsByTagName('body')[0].style.cursor = null;
			window.getSelection().removeAllRanges();
			overlay.setAttribute('class', 'wishlist-bookmarklet overlay');
			CancelButton.setAttribute('class', 'wishlist-bookmarklet button cancel hidden');
		}
	}

	document.addEventListener('mouseup', selectText.storeSelection);
	document.getElementsByTagName('body')[0].style.cursor = 'text';
}

function selectImage(input){
	overlay.setAttribute('class', 'wishlist-bookmarklet overlay hidden');
	CancelButton.setAttribute('class', 'wishlist-bookmarklet button cancel');
	var documentImages = document.getElementsByTagName('img');


	selectImage.storeImage = function(e){
		e.preventDefault();
		input.value = e.target.src;
		if (documentImages.length>0){
			for (var i=0; i<documentImages.length; ++i){
				documentImages[i].className = documentImages[i].className.replace(" wishlist-bookmarklet-document-images", "");
				documentImages[i].removeEventListener('click', selectImage.storeImage);
			}
		}
		overlay.setAttribute('class', 'wishlist-bookmarklet overlay');
		CancelButton.setAttribute('class', 'wishlist-bookmarklet button cancel hidden');
	}

	if (documentImages.length>0){
		for (var i=0; i<documentImages.length; ++i){
			documentImages[i].className = documentImages[i].className + " wishlist-bookmarklet-document-images";
			documentImages[i].addEventListener('click', selectImage.storeImage);
		}
	}
}

overlay.addEventListener('click', function(e){
	if(e.target===overlay||e.target===List){
		overlay.setAttribute('class', 'wishlist-bookmarklet overlay hidden');
		LaunchButton.setAttribute('class', 'wishlist-bookmarklet button launch');
		ListButton.setAttribute('class', 'wishlist-bookmarklet button list');
		overlay.removeChild(overlay.childNodes[0]);
	}
});

CancelButton.addEventListener('click', function(){
	overlay.setAttribute('class', 'wishlist-bookmarklet overlay');
	CancelButton.setAttribute('class', 'wishlist-bookmarklet button cancel hidden');
	var documentImages = document.getElementsByTagName('img');

	if (documentImages.length>0){
			for (var i=0; i<documentImages.length; ++i){
				documentImages[i].className = documentImages[i].className.replace(" wishlist-bookmarklet-document-images", "");
				documentImages[i].removeEventListener('click', selectImage.storeImage);
			}
		}
});

SubmitButton.addEventListener('click', function(){

	if(TitleInput.value){
		if(!WishlistBookmarkletData[TitleInput.value.trim()]){
					WishlistBookmarkletData[TitleInput.value.trim()] = {
					image: ImageInput.value,
					comment: CommentInput.value,
					href: window.location.href,
					origin: window.location.origin
				}

				//localStorage.WishlistBookmarkletData = JSON.stringify(WishlistBookmarkletData);
				iframe.contentWindow.postMessage(JSON.stringify(WishlistBookmarkletData), '*');
			} else{
				alert('Item with name ' + TitleInput.value.trim() + ' already exists');
			}

		overlay.setAttribute('class', 'wishlist-bookmarklet overlay hidden');
		LaunchButton.setAttribute('class', 'wishlist-bookmarklet button launch');
		ListButton.setAttribute('class', 'wishlist-bookmarklet button list');
		overlay.removeChild(overlay.childNodes[0]);

	} else {
		alert("Title can't be empty")
	}

	console.log(WishlistBookmarkletData);
});


ListButton.addEventListener('click', launchList);

function launchList(){
	if(!ListFilter.FilteredData){ 
		ListFilter.FilteredData = WishlistBookmarkletData; 
	}
	ListFilter.dispatchEvent(new Event('input'));

	overlay.setAttribute('class', 'wishlist-bookmarklet overlay');
	ListButton.setAttribute('class', 'wishlist-bookmarklet button list hidden');
	LaunchButton.setAttribute('class', 'wishlist-bookmarklet button launch hidden');
	overlay.appendChild(List);

	ListFilter.dispatchEvent(new Event('input'));
	redrawSelectedItem();
	redrawPagination();
}


function removeItem() {
	delete WishlistBookmarkletData[SelectedItem.SelectedItemData.title];
	//localStorage.WishlistBookmarkletData = JSON.stringify(WishlistBookmarkletData);
	iframe.contentWindow.postMessage(JSON.stringify(WishlistBookmarkletData), '*');
	delete SelectedItem.SelectedItemData;
	ListFilter.dispatchEvent(new Event('input'));
	redrawSelectedItem();
	redrawPagination();
	
}

})();
