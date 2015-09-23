var LOTI = { };

LOTI.Apply = function (regex, strategy) {

	for(var i=0; i < LOTI.Payloads.length; i++)
	{
		var payload = LOTI.Payloads[i];
		if(regex.test(payload.detail))
		{
			if(payload.inputtype == LOTI.InputType.ATTACK)
			{
				if(strategy == LOTI.InputControlStrategy.WHITELIST)
				{
					// a bad input has been matched with whitelist validation, hence, a failure
					payload.color = LOTI.Colors.FAILURE;
				}
				else
				{
					// a bad input has been matched with blacklist validation, hence, a success
					payload.color = LOTI.Colors.SUCCESS;
				}
			}
			else
			{
				if(strategy == LOTI.InputControlStrategy.WHITELIST)
				{
					// a good input has been matched with whitelist validation, hence, a success
					payload.color = LOTI.Colors.SUCCESS;
				}
				else
				{
					// a good input has been matched with blacklist validation, hence, a failure
					payload.color = LOTI.Colors.FAILURE;
				}			
			}
		}
		else
		{
			if(payload.inputtype == LOTI.InputType.ATTACK)
			{
				if(strategy == LOTI.InputControlStrategy.WHITELIST)
				{
					// a bad input has been missed with whitelist validation, hence, a success
					payload.color = LOTI.Colors.SUCCESS;
				}
				else
				{
					// a bad input has been missed with blacklist validation, hence, a failure
					payload.color = LOTI.Colors.FAILURE;
				}			
			}
			else
			{
				if(strategy == LOTI.InputControlStrategy.WHITELIST)
				{
					// a good input has been missed with whitelist validation, hence, a failure
					payload.color = LOTI.Colors.FAILURE;
				}
				else
				{
					// a good input has been missed with blacklist validation, hence, a success
					payload.color = LOTI.Colors.SUCCESS;
				}					
			}
		}
	}
}

LOTI.CalculateScore = function()
{
	var totalPayloads = LOTI.Payloads.length;
	var totalSuccesses = 0;
	var totalFailures = 0;
	for(var i=0; i < totalPayloads; i++)
	{
		var payload = LOTI.Payloads[i];
		if(payload.color == LOTI.Colors.SUCCESS)
		{
			totalSuccesses++;
		}
		else
		{
			totalFailures++;
		}
	}
	
	return parseInt(100 * totalSuccesses / totalPayloads);
}

LOTI.Colors = { FAILURE: "red", SUCCESS: "green"};

LOTI.InputType = Object.freeze(
				{ 	
					GENERIC: 0, 
					ATTACK: 1, 
					EMAIL: 2, 
					CREDITCARD: 3, 
					USERNAME: 4, 
					NAME: 5,  
					PASSWORD: 6, 
					PHONENUMBER: 7, 
					URL: 8, 
					DATE: 9, 
					TCKNO: 10, 
					FILENAME: 11, 
					IP: 12, 
					COUNTRY: 13, 
					SEARCH: 14, 
					COMMENT: 15 
				}
				);

LOTI.InputControlStrategy = { BLACKLIST: 0, WHITELIST: 1};

LOTI.HTMLEncode = function (str) {
							return String(str)
								.replace(/</g, '&lt;')
								.replace(/>/g, '&gt;');
};

LOTI.Payloads = 
[
	{
		name: 'XSS',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'XSS using UTF-7 Encoding',
		detail: '+ADw-SCRIPT+AD4-onerror=alert;throw 1;+ADw-/SCRIPT+AD4-',
		
	}
	, 
	{
		name: 'SQL Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'Integer union-based SQLi',
		detail: '1 union all select null,null,null -- '
	}
	,
	{
		name: 'Filename',
		value: 1,
		inputtype: LOTI.InputType.FILENAME,		
		summary: 'An image\'s filename with extension',
		detail: 'sleepy.jpg'
	}	
	, 
	{
		name: 'XSS',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'XSS HTML Encoded',
		detail: '&#x27&#x3b&#x61&#x6c&#x65&#x72&#x74&#x28&#x31&#x29&#x2f&#x2f',
		
	}
	, 	
	{
		name: 'Full Name',
		value: 1,
		inputtype: LOTI.InputType.NAME,
		summary: 'A looong name and surname',
		detail: 'Cihandabir Biricik Birtane Birleşik Meltem'
	}
	, 
	{
		name: 'Directory Traversal',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,		
		summary: 'Double URL Encoded path traversal attack',
		detail: '%25%32%65%25%32%65%25%35%63%25%32%65%25%32%65%25%35%63%25%32%65%25%32%65%25%35%63%25%37%37%25%36%35%25%36%32%25%32%65%25%36%33%25%36%66%25%36%65%25%36%36%25%36%39%25%36%37'
	}
	, 
	{
		name: 'Comment',
		value: 1,
		inputtype: LOTI.InputType.COMMENT,		
		summary: 'A normal a bit of rich comment',
		detail: 'Hence, the following holds in math 2 < 5 > 3'
	}
	,
	{
		name: 'OS Command Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'Windows based OS command injection',
		detail: ' && ping www.guvenlikod.com'
	}
	, 
	{
		name: 'Email',
		value: 1,
		inputtype: LOTI.InputType.EMAIL,		
		summary: 'Gmail GK mail address',
		detail: 'guvenlikod@gmail.com'
	}
	,
	{
		name: 'XPath Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'An XPath for guessing hidden tokens, such as hashed passwords',
		detail: '\') AND starts-with(token=\'A'
	}
	,
	{
		name: 'URL',
		value: 1,
		inputtype: LOTI.InputType.URL,		
		summary: 'Guvenlikod\'s URL',
		detail: 'http://www.guvenlikod.com/'
	}
	,	
	{
		name: 'LDAP Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'An XPath for guessing hidden attributes, such as phonenumbers',
		detail: '*)(phoneNumber=5'
	}
	,
	{
		name: 'Password',
		value: 1,
		inputtype: LOTI.InputType.PASSWORD,		
		summary: 'My gmail password for the curious',
		detail: 'T8la%4hj=!'
	}	
	,	
	{
		name: 'Session Fixation',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'PHP Session Fixation',
		detail: 'ooqothrd55hhoq1mmojqtbjrh7'
	}
	,
	{
		name: 'Date',
		value: 1,
		inputtype: LOTI.InputType.DATE,
		summary: 'Someone\s birth date in month-day-year format',
		detail: '03-11-1988'
	}
	, 	
	{
		name: 'SQL Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'SQL Injection with MYSQL \\ escape',
		detail: "admin\\' or 2=2 #"
	}
	,
	{
		name: 'Comment',
		value: 1,
		inputtype: LOTI.InputType.COMMENT,		
		summary: 'A normal comment',
		detail: 'An article, which is what we have been taught, comprises three sub-sections; introduction (that\'s also called motivation nowadays), body and conclusion.'
	}
	,
	{
		name: 'XSS',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'XSS using quoteless HTML Attribute',
		detail: ' onclick=prompt(1)',
		
	}	
	, 
	{
		name: 'Credit Card Number',
		value: 1,
		inputtype: LOTI.InputType.CREDITCARD,		
		summary: 'My credit card number',
		detail: '5322662443606568'
	}	
	,
	{
		name: 'CRL/LF Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'EOL Characters in URL decoded',
		detail: '\\r\\n11.02.2016 This is a fake line or header'
	}
	,
	{
		name: 'TCK No',
		value: 1,
		inputtype: LOTI.InputType.TCKNO,		
		summary: 'My social security number, for your information',
		detail: '13602915649'
	}	
	,
	{
		name: 'XSS',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'XSS with JS Encoding',
		detail: '"*\u0061\u006C\u0065\u0072\u0074(1)*"'
	}	
	, 	
	{
		name: 'Search Criteria',
		value: 1,
		inputtype: LOTI.InputType.SEARCH,
		summary: 'A quite possible quality search criteria with operators',
		detail: '"Organic Apple" -Red'
	}	
	,
	{
		name: 'IIS Semi-Colon Attack',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'Microsoft IIS semi-colon vulnerability payload',
		detail: 'myshll.asp;.jpg'
	}
	,
	{
		name: 'Country/City',
		value: 1,
		inputtype: LOTI.InputType.COUNTRY,
		summary: 'The most peaceful country in the world, so sad for rest of us!',
		detail: 'Iceland'
	}	
	,
		{
		name: 'Code Injection',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'Spring EL code injection',
		detail: '${applicationScope}'
	}
	,
	{
		name: 'Phone Number',
		value: 1,
		inputtype: LOTI.InputType.PHONENUMBER,		
		summary: 'My phone international number ;)',
		detail: '+9005991234567'
	}
	,
	{
		name: 'XSS',
		value: 1,
		inputtype: LOTI.InputType.ATTACK,
		summary: 'A classic XSS with HTML element',
		detail: '<img src=wsda onerror=alert(1) />'
	}	
	,
	{
		name: 'IP Address',
		value: 1,
		inputtype: LOTI.InputType.IP,
		summary: 'A client\'s IP Address',
		detail: '192.168.54.65'
	}	
	,
	{
		name: 'Username',
		value: 1,
		inputtype: LOTI.InputType.USERNAME,
		summary: 'A twitter user name',
		detail: 'sub-arachnoid'
	}		
];