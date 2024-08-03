import fetch from 'node-fetch';
import { JSDOM } from 'jsdom'; 

export const refData = {
    states : [ "andhra-pradesh" , "telangana" ] ,
    districts : [ 
        "visakhapatnam" , "amaravati-krishna" , "east-godavari" , "chittoor" , "guntur" , 
        "kurnool" , "anantapur" , "west-godavari" , "vizianagaram" , "srikakulam" , "nellore" ,
        "ysr" , "prakasam" , "parvatipuram-manyam" , "alluri-sitharama-raju"
    ],
    catagories_List : ["andhra-pradesh", "telangana" , "politics" ,"nri", "crime", "world", "explained" , "latest-news", "movies", "technology", "health" , "devotional", "youth"  ] 
}
const main_link = "https://www.eenadu.net/andhra-pradesh";
const latestNews_js = "#wrapper > div.col-left > div.fst-blc-reload > div.two-col-left-block.box-shadow > div";
const enadu_by_district_link = "https://www.eenadu.net/andhra-pradesh/districts/" ;
const enadu_by_district_js = "#wrapper > div.cont-district-more.dist-mt4 > div > div.district-subdiv.dst-hm-bl" ;


const enadu = async (url) => {
    let req = await fetch(url);
    let res = await req.text();
    const dom = new JSDOM(res);
    const doc = dom.window.document;
    return doc;
}; 
const request_Specifc_News_by_JS = async (url, js) => {
    try {
        let doc = await enadu(url);
        let re = doc.querySelector(js);
        return re;
    } catch (error) {
        console.log("error by request_Specifc_News_by_JS", error);
    }
}; 

export const latest_news_district_obj = async(stateName)=>{ 
    if ( ! refData.districts.includes(stateName)  ) { 
        return `<center> <h1> yem ledhu ekkada ... </h1> </center>`
    }
    let doc = await request_Specifc_News_by_JS(`${enadu_by_district_link}${stateName}`,enadu_by_district_js) ; 
    let result = [{state: stateName , creater:"MSRV", category : "State News", news : [] }]; 
    doc.childNodes.forEach((element,index) => {
        if (index%2 == 1) {
            let heading = element.getElementsByTagName("a")[1].getElementsByTagName("h3")[0].innerText ;
            let content = element.getElementsByTagName("a")[1].childNodes[5].wholeText ;
            let link = element.getElementsByTagName("a")[1].href  ;
            let imgURL = element.querySelector("img").src ;
            let imgALT = element.querySelector("img").alt ;
            let obj = {
                url: link,
                imgUrl: imgURL,
                imgAlt: imgALT,
                heading: heading,
                content: content,
                publication : "Enadu"
            }; 
            result[0].news.push(obj)
        } 
    });  
    return result
}; 
//  multiCatogiri_News_Obj - [ "politics" ,"nri", "crime", "world", "explained" , "latest-news"]
//  multiCatogiri_News_Obj - list [ "movies", "technology", "health" , "devotional", "youth" ]

export const multiCatogiri_News_Obj = async(catagorie)=>{
    if ( ! refData.catagories_List.includes(catagorie)  ) { 
        return `<center> <h1> yem ledhu ekkada ... </h1> ${catagorie} </center>`
    }

    let c = catagorie.toLowerCase() ;
    let Enadu_url = `https://www.eenadu.net/${c}` ;
    let js = "#wrapper > div.col-left > div:nth-child(5) > div.telugu_uni_body" ;
    if (c === "latest-news") { js = "#wrapper > div.col-left > div:nth-child(3) > div.telugu_uni_body" } ;
    if (c === "movies"){ js = '#wrapper > div.col-left > div.two-col-left-block.offset-b4 > div.rc-bor.bb-n > ul'}
    if (c === "technology"){ js = ' #wrapper > div:nth-child(3) > div:nth-child(3) > ul ' ; } 
    if (c ==="telangana" || c==="andhra-pradesh" ){js = "#wrapper > div.col-left > div.fst-blc-reload > div.two-col-left-block.box-shadow > div" } ; 
    if (c === "health" || c === "devotional" || c === "youth" ) {
        js = '#wrapper > div.col-left > div.two-col-left-block.box-shadow.telugu_uni_body.offset-b > ul:nth-child(3)' ;
    };  
    let doc = await request_Specifc_News_by_JS( Enadu_url , js ) ; 
    let result = [{state:"AndhraPradesh", creater:"MSRV", category : c, news : [] }];
    let url , heading, imgUrl , imgAlt ,  content ;  

    if (c==="telangana" || c==="andhra-pradesh" || c==="politics" || c==="nri" || c=="crime" || c=="world" || c=="explained" || c=="latest-news") { 
        doc.childNodes.forEach( (each, index)=>{
            try { 
                if (c === "latest-news") { 
                    url = each.querySelector("a").href ; 
                    imgUrl = each.querySelector("img").src ;
                    imgAlt = each.querySelector("img").alt ;
                    heading = each.querySelector("h3").innerText ;
                    content = Object.values( each.querySelector("div").childNodes ).pop().textContent;  
                    let obj = {
                        url: url,
                        imgUrl: imgUrl,
                        imgAlt: imgAlt,
                        heading: heading,
                        content: content,
                        publication : "Enadu"
                    }; 
                    result[0].news.push(obj) ; 
                } else { 
                    if (index%2 == 1) {
                        url = each.querySelector("a").href ; 
                        imgUrl = each.querySelector("img").src ;
                        imgAlt = each.querySelector("img").alt ;
                        heading = each.querySelector("h3").childNodes[0].wholeText ; 
                        content = Object.values( each.querySelector("div").childNodes ).pop().textContent ; 
                        let obj = {
                            url: url,
                            imgUrl: imgUrl,
                            imgAlt: imgAlt,
                            heading: heading,
                            content: content,
                            publication : "Enadu"
                        }; 
                        result[0].news.push(obj) ; 
                    }
                }
            } catch (error) {
                // console.log(" if  block multi catagori obj function",  error  );
            }
        })
    }else{
        doc.childNodes.forEach((each,index)=>{  
            try {
                if (index%2 == 1) {
                    url = each.querySelector("a").href ;
                    imgUrl = each.querySelector("img").src ;
                    imgAlt = each.querySelector("img").alt ;
                    if ( each.querySelector("h3") ) { heading = each.querySelector("h3").childNodes[0].wholeText  }
                    else{ heading = null }  
                    if ( c == "devotional" || c=="health" || c == "youth" ) { 
                        content = Object.values(each.querySelector("a").querySelector(".black").childNodes).pop().textContent ;
                    }else{ 
                        content = Object.values( each.querySelector("a").querySelector("div").childNodes ).pop().textContent 
                    }
                    let obj = {
                        url: url,
                        imgUrl: imgUrl,
                        imgAlt: imgAlt,
                        heading: heading,
                        content: content,
                        publication : "Enadu"
                    };     
                    result[0].news.push(obj) ; 
                }
            } catch (error) {
                // console.log( " else block  - multiCatogiri_News_Obj list type obj block", error );
            }
        })
        return result
    } 
    // console.log( result );
    return result
}

function amma(params) {
    let a = {
       name  : "amma"
    }
    return a 
}


export { amma };