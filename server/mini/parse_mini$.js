function parseMiniFile(filename) {
    console.log("Parsing mini$ file " + filename);

    function getValue(blockType, key, value) {
        switch (key) {
            case 'date':
            case'modificationDate':
                return moment(value).toDate();
            case 'balance':
            case 'amount':
                return parseFloat(value.replace(/\,/g, ""));
            case 'reconciled':
                return value == 'true';
            default:
                return value;
        }
    }

    var actionMapper = {
        Accounts: {
            K: "accountType",
            U: "name",
            B: "balance",
            S: "status"
        },
        Expenses: {
            U: "name",
            G: "category"
        },
        Income: {
            U: "name",
            G: "category"
        },
        Payees: {
            U: "name"
        },
        Transactions: {
            "@": "account",
            $: "amount",
            G: "category",
            C: "color",
            T: "type",
            D: "date",
            M: "modificationDate",
            N: "note",
            "#": "check",
            P: "from-to",
            R: "reconciled",
            U: '?',	// what's this?
            K: '?'	// and this?
        },
        // S="status (account) OR start (repetition)",
        L: "last",
        //#T="repetition",
        //R="repetitionDetail (repetition) or reconciled (transaction)",
        I: "attachment"


    };
    /*
     actionMapper["S"] = "status" if blockType == "Accounts" else "start"
     actionMapper["R"] = "reconciled" if blockType == "Transactions" else "repetitionDetail"
     actionMapper["T"] = "type" if blockType == "Transactions" else "repetitions"
     */

    var memory = {
        accounts: {},
        ending_balances: {},
        balances: {},
        pending_transfers: {},
        oldest_date: {}, // the first day with statements, for any account name
        timezone: 'Europe/Rome'
    };


    var blockType = null,
        currentBlock = {},
        actionName;


    var input = fs.createReadStream(filename);
    var converterStream = iconv.decodeStream('windows-1252');
    readline.createInterface({
        input: input.pipe(converterStream),
        terminal: false
    }).on('line', function (line) {
            line = line.trim();
            if (!line) return;
            var action = line[0],
                desc = line.slice(1);
            // these action are applied for any kind of block
            //if (['!', 'K'].indexOf(action) == -1) return;
//			console.log(blockType, action, desc);
            switch (action) {
                case '!':	// starting a block
                    if (["Accounts", "Expenses", "Income", "Keywords", "Payees",
                        "Reminders", "Scheduled", "Transactions", "Trash"].indexOf(desc) != -1) {
                        blockType = desc;	// we are entering the respective blocktype
                        currentBlock = {}
                    }
                    else {
                        throw new Error('Invalid block type ' + desc);
                    }
//					console.log("Setting blockType:", blockType);
                    return;
                case '^':	// ending a statement (keeping in the same blocktype)
                    // write currentBlock
                    console.log("I should write ", currentBlock);
                    currentBlock = {};
                    return;
                case '*':	// ending of a block
                    // current block should be closed so I assert
//					console.log("End of block", blockType);
                    assert.equal(_.isEmpty(currentBlock), true, 'currentblock should be empty instead of ' +
                        JSON.stringify(currentBlock));
                    blockType = null;
                    return;
            }

            switch (blockType) {
                case null:
                    throw new Error("Action " + action + " on blocktype " + blockType + " is not supported.");
                    break;
                case 'Trash':
                    return;	// ignore everything on trash
                default:
                    if (!(blockType in actionMapper)) {
                        throw new Error("Unknown block type " + blockType);
                    }
                    if (!(action in actionMapper[blockType])) {
                        throw new Error("Action " + action + " (with content " + desc + ")" +
                            " on blocktype " + blockType + " is not supported.");
                    }
                    actionName = actionMapper[blockType][action];
//					console.log("action", actionName);
                    if (actionName == "?") {
                        if (desc) throw new Error('Unknown action ' + action + ":" + desc);
                    }
                    else
                        currentBlock[actionName] = getValue(blockType, actionName, desc);
            }
        }
    ); // end of on_line
}

var require = typeof(Meteor) != 'undefined' ? Meteor.npmRequire : require;
//	Use NPM packages with arunoda meteor-npm if in Meteor, Node require otherwise
var fs = require('fs'),
    iconv = require('iconv-lite'),
    assert = require('assert'),
    readline = require('readline'),
    _ = require('underscore'),
    //moment = require('moment'),
    path = require('path');

console.log(process.env.PWD);
var BASE_PATH = path.resolve(process.env.PWD || process.cwd());
var minifile = typeof(Meteor) != 'undefined' ?
    path.resolve(BASE_PATH, "server/mini/mini$tests/simple") :
    path.resolve(BASE_PATH, "mini$tests/simple");
console.log(minifile);
console.log(fs.existsSync(minifile) ? "Exists!" : "Doesn't exists :-(");
parseMiniFile(minifile);
