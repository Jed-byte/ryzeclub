---
name: sharing-staging-api-key-with-client
description: "This is the format to provide a staging key to a client"
---

## Writing: ASD-STE100 for all output

Everything this skill writes for a person (documents, reports, findings, briefs, messages, summaries, chat replies) uses ASD-STE100 (Simplified Technical English) at about 80%. Readers include people who do not speak English as a first language.

- Write sentences of 20 words or fewer. A list of conditions can have 25. Write one idea in each sentence.
- Use a full stop, not a semicolon. Do not use em dashes or en dashes. Use a colon, a hyphen or a new sentence.
- Use the active voice and the present tense. "Lune sends the file", not "The file is sent".
- Write instructions as commands. "Add the end date."
- Use one term for one concept in the whole output. Do not change words for variety.
- Do not use idioms, metaphors or writerly phrases. Say what happens: "The item stays on the list", not "the item ages honestly".
- Use plain, common words. Explain an abbreviation the first time you use it.
- The 20% that stays: product names, API and field names, code, regulatory names and domain words such as "cashback" or "accrual".
- Before you deliver a long document, check it: list each sentence over 20 words and shorten it.

This section applies to the language only. It does not change the structure, templates or steps of this skill.

## Email template

Send this text. Do not add to it.

Hello all,

Here is the staging API key:

Key: (added in manually)
Endpoint: POST https://enrichment-stg-uae.lunedata.io/api/v2/transaction/enrich?response-type=consumer

Our documentation describes the request and response fields: https://docs.lunedata.io/enrichment/enrichment-api. It also shows the path to get brand logos.

The staging environment is available during UAE working hours. Tell us if you need it for more hours.

We can have a call if you need more help.

Best regards,
