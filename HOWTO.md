## HOWTO

Run slack bot to test it out locally:
`slack run`

List all entries in the Cartina handbook:
`slack datastore query '{"datastore": "%Name of handbook%"}'`

Add an entry to the Cartina handbook:
`slack datastore put '{"datastore": "%Name of handbook%", "item": {"id": "2", "terms": "info", "content": "%Content text%"}}'`

Delete an entry from the Cartina handbook by ID:
`slack datastore delete '{"datastore": "%Name of handbook%", "id": "%ID%"}'`

List all triggers:
`slack trigger list`

Create a trigger:
`slack trigger create`

Update existing trigger:
`slack trigger update`

Deploy bot:
`slack deploy`

### Reference API links
- https://api.slack.com/automation/run
- https://api.slack.com/automation/deploy
- https://api.slack.com/automation
- https://api.slack.com/automation/triggers/scheduled
- https://api.slack.com/automation/apicalls

#### Youtube videos
- https://www.youtube.com/watch?v=DelYv1tGF8k (Creating Slack app triggers)
- https://www.youtube.com/watch?v=yeFECP4IVWY&t=178s (Understanding Slack datastores)
- https://docs.deno.com/runtime/manual/getting_started/installation
- https://api.slack.com/automation/cli/install