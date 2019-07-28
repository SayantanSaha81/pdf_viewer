const url"../docs/pdf.pdf";

let pdfdoc=null,
    pagenum=1,
    pagerendering=false,

    pagenumispending=false;

const scale=1.5,
      canvas=document.queryselector("#pdf-render"),
      ctx=canvas.getcontext("2d");

//renderthepage
const renderpage=num=>{
	pageisrendering=true;

	//get page
	pdfdoc.getpage(num).then(page =>{
		//scale
		const viewport=get.viewport({scale})
		canvas.height=viewport.height;
		canvas.width=viewport.width;

		const renderctx={
			canvascontext:ctx,
			viewport
		}

		page.render(renderctx).promise.then(() =>{
			pageisrendering=false;

			if (pagenumispending!=null) {
				renderpage(pagenumispending);
				pagenumispending=null;
			}
		} );
        
        //output current page
        document.queryselector("#pagenum").textcontent=num;
	});

};

//check for pages rendering
const queuerenderpage=num=>{
	if (pageisrendering) {
		pagenumispending=num;
	}else{
		renderpage(num)
	}
}

//show previous page
const showprevpage=()=>{
	if (pagenum<=1) {
		return;
	}else{
		pagenum--;
		queuerenderpage(num);
	}
}

//show next page
const shownxtpage=()=>{
	if (pagenum>=pdfdoc.numpages) {
		return;
	}else{
		pagenum++;
		queuerenderpage(num);
	}
}

//get document
pdfjslib.getdocument(url).promise.then(pdfdoc_ =>{
	pdfdoc=pdfdoc_;

	document.queryselector("#pagecount").textcontent=pdfdoc.numpages;

	renderpage(pagenum)
});

//button events
document.queryselector(#prev-page).addeventlistener("click",showprevpage);
document.queryselector(#next-page).addeventlistener("click",shownxtpage);