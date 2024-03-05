import { ethers } from 'ethers';

let contract = undefined;
let signer = undefined;
const contractAddress = "0xab99440f3cdfb954becd01c7dd0a18145f497b96";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_quote",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setQuote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getQuote",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quote",
						"type": "string"
					}
				],
				"internalType": "struct quoteForEveryone.OurQuotes[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ourQuotes",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quote",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
            );
        });
    });

document.getElementById("getQuote").addEventListener("click", async function(){
    try {
        const quotes = await contract.getQuote();

        let showQuoteElement = document.getElementById("showQuote");

        for (let i = 0; i < quotes.length; i++) {
            let aside = document.createElement("aside");
            let blockquoteElement = document.createElement("blockquote");
            let citeElement = document.createElement('cite');
            
            let authorQuote = document.createTextNode(quotes[i].name);
            let textQuote = document.createTextNode(quotes[i].quote);

            // Tambahkan CSS untuk miringkan teks
            blockquoteElement.style.fontStyle = "italic";
            citeElement.style.fontStyle = "italic";

            blockquoteElement.appendChild(textQuote);
            citeElement.appendChild(document.createTextNode("- " + authorQuote.textContent)); // Tambahkan "- " sebelum nama penulis
            
            aside.appendChild(blockquoteElement);
            aside.appendChild(citeElement);
            showQuoteElement.appendChild(aside);
        }
    } catch (error) {
        console.error(error);
    };
});

document.getElementById("setNote").addEventListener("click", async function(){
    try {
        console.log("On process. Make sure you have balance on Sepolia. If not, let's get faucet from sepoliafaucet.com.");
        const note = document.getElementById("enterNote").value;
        await contract.setNote(note);
        setTimeout(() => alert("Let's reload page and click button \"Click it\" until the text changes."), 13000);
        console.log("Wait...");
        
    } catch (error) {
        console.error(error);
    };
});