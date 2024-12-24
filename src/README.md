# Getting Started with Simple Quiz

Simple Quiz is a single-page app where you self-assess on a questionnaire for a specific subject. 
The `title` should distinguish any specific subject from similar subjects.
The `intro` is __optional__. It will not be shown by default so the user can focus on the questions.\n 
_Only the intro_ allows using markdown.
The `challenges` field contains prompts and solutions.

## Q & A

What type does the \"challenges\" field have?
: array

Each item is itself an...
: array

The first string is the prompt, the second string the...
: solution

Putting an _ in the text allows you to inline the input field.
: underscore

The subject data is sent as JSON in the:
: querystring

It is encoded in the "jsonb" GET parameter using
: base64

How do I generate this data? Ask your...
: AI

## Samples
### JSON
```
{
    "title": "Getting Started with Simple Quiz",
    "intro": "Simple Quiz is a single-page app where you self-assess on a questionnaire for a specific subject. The `title` should distinguish any specific subject from similar subjects. The `intro` is __optional__. It will not be shown by default so the user can focus on the questions.\n _Only the intro_ allows using markdown.",
    "challenges": [
        ["What type does the \"challenges\" field have?", "array"],
        ["Each item is itself an...", "array"],
        ["The first string is the prompt, the second string the:","solution"],
        ["Putting an _ in the text allows you to inline the input field.","underscore"],
        ["The subject data is sent as JSON in the:","querystring"],
        ["It is encoded in the \"jsonb\" GET parameter using","base64"],
        ["My base64 string doesn't work. Maybe it got too...","long"]
    ]
}
```

### QueryString

```
?jsonb=ewogICAgInRpdGxlIjogIkdldHRpbmcgU3RhcnRlZCB3aXRoIFNpbXBsZSBRdWl6IiwKICAgICJpbnRybyI6ICJTaW1wbGUgUXVpeiBpcyBhIHNpbmdsZS1wYWdlIGFwcCB3aGVyZSB5b3Ugc2VsZi1hc3Nlc3Mgb24gYSBxdWVzdGlvbm5haXJlIGZvciBhIHNwZWNpZmljIHN1YmplY3QuIFRoZSBgdGl0bGVgIHNob3VsZCBkaXN0aW5ndWlzaCBhbnkgc3BlY2lmaWMgc3ViamVjdCBmcm9tIHNpbWlsYXIgc3ViamVjdHMuIFRoZSBgaW50cm9gIGlzIF9fb3B0aW9uYWxfXy4gSXQgd2lsbCBub3QgYmUgc2hvd24gYnkgZGVmYXVsdCBzbyB0aGUgdXNlciBjYW4gZm9jdXMgb24gdGhlIHF1ZXN0aW9ucy5cbiBfT25seSB0aGUgaW50cm9fIGFsbG93cyB1c2luZyBtYXJrZG93bi4iLAogICAgImNoYWxsZW5nZXMiOiBbCiAgICAgICAgWyJXaGF0IHR5cGUgZG9lcyB0aGUgXCJjaGFsbGVuZ2VzXCIgZmllbGQgaGF2ZT8iLCAiYXJyYXkiXSwKICAgICAgICBbIkVhY2ggaXRlbSBpcyBpdHNlbGYgYW4uLi4iLCAiYXJyYXkiXSwKICAgICAgICBbIlRoZSBmaXJzdCBzdHJpbmcgaXMgdGhlIHByb21wdCwgdGhlIHNlY29uZCBzdHJpbmcgdGhlOiIsInNvbHV0aW9uIl0sCiAgICAgICAgWyJQdXR0aW5nIGFuIF8gaW4gdGhlIHRleHQgYWxsb3dzIHlvdSB0byBpbmxpbmUgdGhlIGlucHV0IGZpZWxkLiIsInVuZGVyc2NvcmUiXSwKICAgICAgICBbIlRoZSBzdWJqZWN0IGRhdGEgaXMgc2VudCBhcyBKU09OIGluIHRoZToiLCJxdWVyeXN0cmluZyJdLAogICAgICAgIFsiSXQgaXMgZW5jb2RlZCBpbiB0aGUgXCJqc29uYlwiIEdFVCBwYXJhbWV0ZXIgdXNpbmciLCJiYXNlNjQiXSwKICAgICAgICBbIk15IGJhc2U2NCBzdHJpbmcgZG9lc24ndCB3b3JrLiBNYXliZSBpdCBnb3QgdG9vLi4uIiwibG9uZyJdCiAgICBdCn0=
```

### URL

https://b7kich.github.io/simple-quiz/?jsonb=ewogICAgInRpdGxlIjogIkdldHRpbmcgU3RhcnRlZCB3aXRoIFNpbXBsZSBRdWl6IiwKICAgICJpbnRybyI6ICJTaW1wbGUgUXVpeiBpcyBhIHNpbmdsZS1wYWdlIGFwcCB3aGVyZSB5b3Ugc2VsZi1hc3Nlc3Mgb24gYSBxdWVzdGlvbm5haXJlIGZvciBhIHNwZWNpZmljIHN1YmplY3QuIFRoZSBgdGl0bGVgIHNob3VsZCBkaXN0aW5ndWlzaCBhbnkgc3BlY2lmaWMgc3ViamVjdCBmcm9tIHNpbWlsYXIgc3ViamVjdHMuIFRoZSBgaW50cm9gIGlzIF9fb3B0aW9uYWxfXy4gSXQgd2lsbCBub3QgYmUgc2hvd24gYnkgZGVmYXVsdCBzbyB0aGUgdXNlciBjYW4gZm9jdXMgb24gdGhlIHF1ZXN0aW9ucy5cbiBfT25seSB0aGUgaW50cm9fIGFsbG93cyB1c2luZyBtYXJrZG93bi4iLAogICAgImNoYWxsZW5nZXMiOiBbCiAgICAgICAgWyJXaGF0IHR5cGUgZG9lcyB0aGUgXCJjaGFsbGVuZ2VzXCIgZmllbGQgaGF2ZT8iLCAiYXJyYXkiXSwKICAgICAgICBbIkVhY2ggaXRlbSBpcyBpdHNlbGYgYW4uLi4iLCAiYXJyYXkiXSwKICAgICAgICBbIlRoZSBmaXJzdCBzdHJpbmcgaXMgdGhlIHByb21wdCwgdGhlIHNlY29uZCBzdHJpbmcgdGhlOiIsInNvbHV0aW9uIl0sCiAgICAgICAgWyJQdXR0aW5nIGFuIF8gaW4gdGhlIHRleHQgYWxsb3dzIHlvdSB0byBpbmxpbmUgdGhlIGlucHV0IGZpZWxkLiIsInVuZGVyc2NvcmUiXSwKICAgICAgICBbIlRoZSBzdWJqZWN0IGRhdGEgaXMgc2VudCBhcyBKU09OIGluIHRoZToiLCJxdWVyeXN0cmluZyJdLAogICAgICAgIFsiSXQgaXMgZW5jb2RlZCBpbiB0aGUgXCJqc29uYlwiIEdFVCBwYXJhbWV0ZXIgdXNpbmciLCJiYXNlNjQiXSwKICAgICAgICBbIk15IGJhc2U2NCBzdHJpbmcgZG9lc24ndCB3b3JrLiBNYXliZSBpdCBnb3QgdG9vLi4uIiwibG9uZyJdCiAgICBdCn0=


## What next?

Prompt your AI to generate more subjects

```
generate 7 example questions and answers for the following subject. ensure no duplicates. put them in an unnamed json array like ["question1","answer1"],... . put the array as "challenges" into an object, add a simple title. encode using base64 then urlencode. Prefix with the code with the url "https://b7kich.github.io/simple-quiz/?jsonb=". Show as code for copy and paste. 
Subject: the names of the musical notes starting with do
```

### Credits
21342__ramjac__quintomovetap1.aiff.mp3 by ramjac -- https://freesound.org/s/21342/ -- License: Attribution 4.0
54407__korgms2000b__metronome-tap.mp3 by KorgMS2000B -- https://freesound.org/s/54407/ -- License: Creative Commons 0
615099__mlaudio__magic_game_win_success-81df3e56.mp3 by MLaudio -- https://freesound.org/s/615099/ -- License: Creative Commons 0
242501__gabrielaraujo__powerupsuccess.wav-dd46c1f4.mp3 by GabrielAraujo -- https://freesound.org/s/242501/ -- License: Creative Commons 0
545589__bandslam33__success-sound.mp3 -- https://freesound.org/s/545589/ -- License: Creative Commons 0
428378__sofiom__16-levantar-dvd.mp3 by sofi.om -- https://freesound.org/s/428378/ -- License: Attribution 3.0
573381__ammaro__ding.mp3 by ammaro -- https://freesound.org/s/573381/ -- License: Creative Commons 0
