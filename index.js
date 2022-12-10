const puppeteer = require('puppeteer');

const verification = async (page) => {
    try {
        await page.goto("https://web.whatsapp.com", { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('._2UwZ_');
        delay(5000)
	    await page.waitForSelector("div#side._1KDb8", { waitUntil: 'domcontentloaded' });
        // await console.log("koka");
    } catch (err) {
        console.log(err);
        // continue;
    }
}

const checkGreen = async (page) => {
    while (true) {
        try {
            delay(1000)
            await page.waitForXPath("//span[contains(@aria-label,'unread')]/ ancestor::div[@class='_3OvU8']", { waitUntil: 'load', timeout: 0 })
            const elHandle = await page.$x("//span[contains(@aria-label,'unread')]/ ancestor::div[@class='_3OvU8']");
			await elHandle[0].click();
        } catch (err) {
            console.log(err);
            delay(10000)
            continue;
        }
    }
}

const sendAutoMessage = async (page) => {

}

async function main(){
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36');
        await page.setRequestInterception(true);
        await page.on('request', (request) => {
            if (request.resourceType() === 'image') request.abort();
            else request.continue();
        });
        verification(page)
        delay(5000)
        checkGreen(page)
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