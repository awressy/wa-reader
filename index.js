const puppeteer = require('puppeteer');

const verification = async (page) => {
    try {
        await page.goto("https://web.whatsapp.com", { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('._2UwZ_');
	    await page.waitForSelector("div#side._1KDb8", { waitUntil: 'domcontentloaded' });
        await console.log("koka");
    } catch (err) {
        console.log(err);
    }
}

async function main(){
    const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36');
	await page.setRequestInterception(true);
    await page.on('request', (request) => {
		if (request.resourceType() === 'image') request.abort();
		else request.continue();
	});
    verification(page)
}

main()