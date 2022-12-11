const puppeteer = require('puppeteer');

async function main(){
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = (await browser.pages())[0];
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36');
        await page.setRequestInterception(true);
    	await page.setDefaultNavigationTimeout(0);
        await page.on('request', (request) => {
            if (request.resourceType() === 'image') request.abort();
            else request.continue();
        });
    	await page.goto("https://eu4.paradoxwikis.com/War_exhaustion", { waitUntil: 'domcontentloaded' });

        var linkTexts = await page.$$eval(".mw-headline", elements=> elements.map(item=>item.textContent))



        // const example = await page.$$('.mw-headline');

        console.log(linkTexts);
        
    } catch (err) {
        console.log(err);
    }
}

main()

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}