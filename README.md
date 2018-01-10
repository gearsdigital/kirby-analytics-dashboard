# Kirby Analytics Dashboard

Kirby Analytics Dashboard is a [Kirby](http://getKirby.com) plugin which extends your dashboard with some Google Analytics statistics and reports. It does not emulate Google Analytics itself but provides a nice and simple overview about how your site is doing.

If you need detailed reports head over to your [Google Analytics Dashboard](https://analytics.google.com/analytics/web).

## Widgets

Currently there is only one widget available but it is planned to add some more :)

**Visitors** – Compares data of the last seven days with those of the previous week.

![Visitor Widget Screenshot](visitors-widget-screenshot.png)

## Prerequisites

In order to receive Google Analytics Data you need to create a Google Service Account to obtain a valid *google-client-id*.

Additionally a *google-view-id* is required.

### Get a Google Client ID

#### Create a Google Service Account

1. Open the [Cloud Resource Manager](https://console.developers.google.com/projectcreate) and create a new project.

#### Configure your Project

1. Got to your [Project Dashboard](https://console.developers.google.com/apis/dashboard). Google should create a redirect to your recently created project. If not, select it from the project dropdown which is located next to the Google APIs-Logo.
2. Locate the Link "Enable APIs and Services", search for **Google Analytics Reporting API** and enable this API.

#### Configure Google Analytics Reporting API

1. **Create Credentials**
	- Locate the Button "*Create Credentials*" and create a new **OAuth client ID**
2. **OAuth client ID**
	- To create an OAuth client ID, you first set a product name on the consent screen. Just add a name and hit save. All other fields can be solely ignored.
3. **Application type**
	- Now you need to define an application type. In our case just select **Web application**.
4. **Authorized JavaScript origins**
	- Define **Authorized JavaScript origins**. If your local Kirby installation is running under localhost just add `http://localhost` otherwise/additionally add your domain here.
	- Entering a JavaScript origin is mandatory and has to match your installation URL. 
5. **Save your Client**
	- After you've created your OAuth client successfully, you should be able to get your **Google Client ID**. *Hint:* It should look like: `000000000000-hsdaisdas8da8s7d8asd8asdz.apps.googleusercontent.com`
	 
### Getting a Google View ID
A view ID can be retrieved from the [Account Explorer](https://ga-dev-tools.appspot.com/account-explorer/). Configure your account, property and your view and you'll find the view ID under `Table ID (ids)` *Hint:* It should look like: `ga:12345678`.

## Installation

1. Download the [latest release](https://github.com/gearsdigital/kirby-analytics-dashboard/releases/latest)
2. Extract the zip and upload the extracted folder to `/site/plugins`
3. Add the following entries to your `/site/config/config.php`
   
	```php
	c::set('analytics.dashboard.view.id', 'ga:XXXXXXXXX');
	c::set('analytics.dashboard.client.id', 'XXXXXXXXX.apps.googleusercontent.com');
	```

4. After logging in to your Kirby panel, you should now see a new widget containing only a "*Sign in with Google*" Button.

**Please Note:** You will not receive any data until you've completed the prerequisites setup!

## Quotas

As Google Analytics is used by millions of sites they put limits and quotas on API requests to protect the system from receiving more data than it can handle. Learn more about [**limits and quotas**](https://developers.google.com/analytics/devguides/reporting/core/v4/limits-quotas).

This plugin is using only the **Google Analytics Reporting API** which means our limit is **10000 requests per day**. I do not expect any issues here because Kirby is used mostly on small sites but I'll improve this plugin and add some caching later this year. 

## Roadmap

1. [ ] improve localization
2. [ ] add totals (weekly, monthly, yearly)
3. [ ] add loading animation while fetching data
4. [ ] add proper response caching 
5. [ ] add configuration page
6. [ ] make visitor widget configurable
7. [ ] add tests

## Contributors

Thank you very much for your effort.

[**@labs-scnm**](https://github.com/labs-scnm) [(df98a74)](https://github.com/gearsdigital/kirby-analytics-dashboard/commit/0ea8db8e1f31707ecb5a594008d84d4991b39f80)

## Contributing

All contributions are very welcome – if you found a bug please tell me!

