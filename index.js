const puppeteer = require('puppeteer');
const cassandra = require('cassandra-driver')

const verification = async (page) => {
    try {
    	await page.goto("https://web.whatsapp.com", { waitUntil: 'domcontentloaded' });
	    await page.waitForSelector('._2UwZ_', { waitUntil: 'domcontentloaded', timeout: 0 });
        console.log('Scan QRCode');
	    await page.waitForSelector("div#side._1KDb8", { waitUntil: 'domcontentloaded', timeout: 0 });
        // await console.log("koka");
    } catch (err) {
        console.log(err);
        // continue;
    }
}

const readMessage = async (page) => {
    await page.waitForSelector('div.message-in', { waitUntil: 'domcontentloaded', timeout: 0 });
    // let message = await document.querySelectorAll('div.message-in');
    let message = await page.$$('div.message-in')
    // console.log(message);
    await message.forEach(async data => {
        // let dataid = await message.getAttribute('data-id');
        // let logtime = await message.querySelector('div.message-in div div div div.copyable-text').getAttribute('data-pre-plain-text');
        // let command = await message.querySelector('div.message-in div div div div div span span').innerText;
        // // await scrapeMessages.push({
        // //     'dataid': dataid,
        // //     'command': command,
        // //     'logtime': logtime 
        // // });
        // console.log(dataid, command, logtime);
        await console.log(data);
    });
    delay(1000)
}

const checkGreen = async (page) => {
    while (true) {
        try {
            delay(1000)
            await page.waitForXPath("//span[contains(@aria-label,'unread')]/ ancestor::div[@class='_3OvU8']", { waitUntil: 'load', timeout: 0 })
            const elHandle = await page.$x("//span[contains(@aria-label,'unread')]/ ancestor::div[@class='_3OvU8']");
			await elHandle[0].click();
            
            readMessage(page)
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
        const page = (await browser.pages())[0];
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36');
        await page.setRequestInterception(true);
    	await page.setDefaultNavigationTimeout(0);
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