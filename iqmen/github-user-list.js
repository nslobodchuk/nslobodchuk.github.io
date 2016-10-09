function GithubUserList(el, str){
	this.el = el;
	this.str = str;
	this.inputAppended = false;
	this.paginationDiv =[];

	this.page=1;

	this.request(this.str, this.page, this.append);

};


GithubUserList.prototype = {

	request: function(str, page, callback){

		console.log("request")

		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", "https://api.github.com/search/users?q=" + str +"&page=" + page + "&per_page=10");
		request.onreadystatechange = function() { 
			if (request.readyState === 4 && request.status === 200) {
				var type = request.getResponseHeader("Content-Type");
				(callback.bind(self))(JSON.parse(request.responseText), str, page);
			}
		};
		request.send(null);
	},

	append: function(r, str, page) {

	var self = this;

	var pages = Math.ceil((+r.total_count)/10);

	if(!this.inputAppended){
	
		var input = document.createElement("input");
		input.setAttribute("class", "github-user-list");
		input.setAttribute("placeholder", "Type user name to search ...");
		input.value = this.str;
		input.addEventListener("input", function(e){
			self.str = e.target.value;
			(function(value){
				if(value==="") return;
							setTimeout(function(){
								if (value === self.str) {
									self.request.bind(self, value, 1, self.append)();
								}
							}, 500);
						})(e.target.value);
		});
	}

	var columnFlex = document.createElement('div');
	columnFlex.setAttribute("class", "github-user-list user-list-container");
	if(!this.inputAppended){
		columnFlex.appendChild(input);
		this.inputAppended= true;
	}
	columnFlex.appendChild(this.returnPagination(page, pages,0));
	
	this.columnFlexOuter = columnFlex;

	columnFlex.appendChild(this.returnUserList(r, str, page));
	columnFlex.appendChild(this.returnPagination(page, pages,1));
	this.el.appendChild(columnFlex);
	this.component = columnFlex;
	},

	returnUserList: function(r, str, page) {

		this.userList?this.component.removeChild(this.userList):'';

	var columnFlex = document.createElement('div');
	columnFlex.setAttribute("class", "github-user-list user-list-container-inner");

		r.items.forEach(function(d){

	var img = document.createElement('img');
	img.width="50";
	img.height = "50";
	img.src = d.avatar_url;

	var p = document.createElement('p');
	p.appendChild(document.createTextNode(d.login));

	var rowFlex = document.createElement('a');
	rowFlex.href = d.html_url;
	rowFlex.target = "_blank";
	rowFlex.setAttribute("class", "github-user-list")
	rowFlex.appendChild(img);
	rowFlex.appendChild(p);

	columnFlex.appendChild(rowFlex);

		});

		this.userList = columnFlex;

		return columnFlex;

	},

	returnPagination: function(page, pages, k) {

		var self = this;

		
		if(this.paginationDiv[k]){
			this.component.removeChild(this.paginationDiv[k]);
		}
		

		var sArray = [,,,,,,,,,,];
	var s = document.createElement("span");
	s.setAttribute("class", "github-user-list pagination");

	if (page>1){
		sArray[0] = s.cloneNode();
		sArray[0].textContent = "<<";
	}

	if (page<pages){
		sArray[10] = s.cloneNode();
		sArray[10].textContent = ">>";
	}

	sArray[1] = s.cloneNode();	
	sArray[1].textContent = "1";

	if (page>=5) {
		sArray[2] = s.cloneNode();
		sArray[2].textContent = "..";
	}

	if (page>=4) {
		sArray[3] = s.cloneNode();
		sArray[3].textContent = page-2;
	} 

	if (page>=3) {
		sArray[4] = s.cloneNode();
		sArray[4].textContent = page-1;
	}

	if (page>=2&&page<=pages-1) {
		sArray[5] = s.cloneNode();
		sArray[5].textContent = page;
	}

	if (page<=pages-2) {
		sArray[6] = s.cloneNode();
		sArray[6].textContent = page+1;
	}

	if (page<=pages-3) {
		sArray[7] = s.cloneNode();
		sArray[7].textContent = page+2;
	}

	if (page<=pages-4) {
		sArray[8] = s.cloneNode();
		sArray[8].textContent = "..";
	}

	if (pages>=2) {
		sArray[9] = s.cloneNode();
		sArray[9].textContent = pages;
	}

	var pagination = document.createElement("p");

	sArray.forEach(function(el){
		if(el&&el.textContent===">>") el.addEventListener("click", self.request.bind(self, self.str, Math.min(page+1,100), self.append)); 
		else if (el&&el.textContent==="<<") el.addEventListener("click", self.request.bind(self, self.str, Math.min(page-1,100), self.append));
		else if (el&&el.textContent!==".."&&(+el.textContent)!==page) el.addEventListener("click", self.request.bind(self, self.str, Math.min((+el.textContent),100), self.append));
		else if (el&&(+el.textContent)===page) el.setAttribute("class", "github-user-list pagination active")
		else if (el&&el.textContent===".."&&(+el.textContent)!==page) el.setAttribute("class", "github-user-list pagination dots");

		pagination.appendChild(el);
	});

	pagination.setAttribute("class", "github-user-list pagination");

	var paginationDiv = document.createElement("div");

	paginationDiv.setAttribute("class", "github-user-list pagination div");

	paginationDiv.appendChild(pagination);

	this.paginationDiv[k] = paginationDiv;

	return paginationDiv;

	},

	destroy: function() {
		this.component.removeChild(this.component.getElementsByTagName('input')[0]);
		this.el.removeChild(this.component);
	}
}

