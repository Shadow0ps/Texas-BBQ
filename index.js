'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Texas Barbeque';

/**
 * Array containing space facts.
 */
var FACTS = [
    "There are four styles of Texas barbecue: Central Texas, South Texas, East Texas, and West Texas. The most popular of these styles, and the most copied, are the East and Central varieties — this is probably because the South and Western varieties involve less specific, tailored instructions.",
    "Central Texas BBQ is when the meat is given a sexy dry-rub with spices and cooked over pecan wood or oak wood using indirect heat.",
    "East Texas BBQ is slow-cooked to the point where the meat falls off the bone seamlessly after being marinated in a sweeter, tomato-like sauce. Hence, BBQ sauce.",
    "South Texas BBQ uses a thick, dripping sauce that helps to marinate the meat during the cooking process.",
    "West Texas BBQ is cooked over mesquite wood using direct heat.",
    "Some argue that the real four categories are cowboy, meat market, East Texas, and Mexican barbacoa, and that each of these styles comes from its own immigrant population.",
    "Along the Mexican border in Texas, the barbacoa style is most common. It’s traditionally cooked in a hole dug in the ground, covered with American aloe plant leaves. However, the process of cooking most modern barbacoa is far from its modest roots, and mostly uses a conventional oven.",
    "Cowboy BBQ references the Anglo ranchers that spread across the American West.",
    "Meat markets in the Central Texas style come from Eastern Euro immigrants.",
    "The East Texas style stems from the African American population in the South.",
    "Most Texas barbecue shops, of meat market style, originally began as butcher shops run by German and Czech immigrants that were just simply recreating their family recipes, where meat smoking in Eastern Europe is a fairly common practice.",
    "Cowboy style, or open-pit barbecue, is the closest style resembling the original hole in the ground.",
    "No historians truly know where the word barbecue even comes from. The leading theory brings us back to the East Texas style, closely associated with Caribbean-style barbecue, where the Taino people use the word barabicu to describe a framework upon posts.",
    "The first mention of American BBQ was surprisingly NOT Texan (sorry guys, know you wanted that one for y’all selves). Instead, it came from Salem, Massachusetts in 1733, when Benjamin Lynde wrote, “fair and hot; browne; barbacue. hack overset.” While it’s not much to go on, the description still matches today, so hey, we’ll take it.",
    "The second mention of American Barbeque was George Washington attending a very barbecue in 1769.",
    "Barbecue is the slow-cooking of meat, while BBQ (spelled with a q instead of a c) is the act of having a party while doing it. Texans have, for their part, thrown this distinction out the window because why not.",
    "Historically, huge trench pits for BBQing were dug in the middle of town’s celebratory event, from a political rally to a parade. Ranchers would donate cattle and sheep for slow-cooking, and marinades were applied thickly with mops. The tradition of the town-style BBQ has long since passed, but I mean, it could use a resurgence for any brave takers…",
    "BBQ and Texas were once also synonymous with religion. As late as the beginning of World War II, churches would hold camp meetings where funds were raised to carry on the meeting for weeks at a time. The hole in the ground for barbecuing would be dug, and people would just keep bringing livestock for slow-cooking.",
    "The New Zion Missionary Baptist church in Huntsville still carries on this tradition today, which began as a fundraiser in the 1980s. Sitting through a church sermon seems that much more appealing with some damn good BBQ waiting for your hungry stomach at the end of it. ",
    "You should wait at least an hour to crush your smoked brisket. World famous BBQ pit masters maintain that their meat needs to rest for ideally an hour after cooking to let the flavors settle.",
    "Any good Texan will remind you that it ain’t barbecue unless it’s got a smoke ring. That, my friends, comes from a chemical reaction between myoglobin, which carries oxygen near muscle tissue, and carbon monoxide in the smoky cooking environment.",
    "The wood you use to smoke your BBQ makes a big difference. Don’t pull a Washington and chop down just any cherry tree, because fruit woods are best for smoking fish and poultry. There ain’t none of that here in Texas. Instead, hickory, oak, and pecan woods are best for beef because they emit such a smoky flavor.",
    "You know who loves BBQ? Presidents of the United States of America, because BBQ is the most American thing on this planet. Pres. Andrew Jackson, a most ornery gent, was nicknamed Old Hickory because he was an asshole tough like the hickory wood used at barbecues.",
    "Lyndon Baines Johnson, Texan extraordinaire, was famous for using barbecue at cookouts to host visiting world leaders, like the President of Mexico and the West German Chancellor. Did he know it would be a hit because both of these nation’s styles of BBQ are popular in Texas? Probably.",
    "Want another LBJ fact? Sure – he was the first President to bring BBQ sauce to the capital.",
    "The Bush family also likes to impress their donors to a good old-fashioned Texas BBQ at their sprawling summer estate in Kennebunkport, Maine, where they frequently serve up brisket and smoked turkey. Really, nothing makes people more agreeable than the smile as they slide into a BBQ coma.",
    "President Obama is the only human in history to have cut the line at Franklin’s in Austin. He bought lunch for the line, but um, hey man.",
    "The first one-star review of Franklins reads, “Just because some hipster served you barbecue out of a cart, does not mean it is good barbecue.”",
    "May is National Barbecue Month, which is a load of bull since all Texans know that every damn day of the year is BBQ day.",
    "Texas has the most barbecue joints in the United States (and probably the world) with 2,238 restaurants and 1,983 independent locations. That number, alas, has probably skyrocketed since a census was taken.",
    "Lockhart is known as the Barbecue Capital of Texas. The town is home some of the most famous BBQ joints in the world: Kreuz Market, Black’s BBQ, Smitty’s and Chisholm Trail, a local’s secret.",
    "Texan-born Stubbs Bar-B-Q is being sued by Stubb’s Bottled Barbecue Sauce because that is the world we live in. Only slightly kidding – customers are being confused too much between the two companies. Are these tourists or Texans?",
    "Pringles released a Texas BBQ scented candle in the United Kingdom. The emailed press release reads: “The odors are particularly pungent, so we might need to scale back.” As someone who lived in England for a while, I can confidently say that Brits are definitely not scared of smells, so that explains why it went to their markets first.",
    "Earlier in 2015, 200 pounds of brisket were stolen from B&B Smokehouse in San Antonio. That brisket bandit was apprehended in April 2015 after selling the meat to the brisket black market. However, another man stole $2,000 worth of brisket from H-E-Bs across the state to do the same.",
    "Texan Ronald Jones II, a USC runningback, made headlines when he got so homesick for Texas BBQ in Cali that he felt dizzy and was unable to play. A quote, to prove this is real: “I just got to get me some Whataburger and some Texas BBQ here.”",
    "Guy Fieri, host of “Diners, Drive-Ins and Dives” and bleached hair fame, featured 18 Texas BBQ-only joints on his show over time, which is a number rivaled only by New York City pizzerias.",
    "Beer snobs the world over seem to agree that the best beer to drink with Texas-style brisket is a dark one, so reach for a stout or a porter next time you’re looking for cans to bring along in the BYOB lines. For a non-elusive choice, try Austin BeerWorks Black Thunder.",
    "Texans love BBQ so much because it’s so damn hot here that everyone just turns into brisket versions of themselves, slow cooking to a crisp from May to August."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's a fun fact about Texas Barbeque:" + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me something about Texas Barbeque, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help ya with partner?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'See ya later partner!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'See ya later partner!');
    }
};
