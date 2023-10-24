// Import syntax
// make changes to this file, then copy them over to the ENUMJS.cjs file

export default class Enum {
    constructor(keyArray){

        if(Array.isArray(keyArray)){
            this.booleans = {};
            this.addKeys(keyArray);
            this.select(keyArray[0]);    
        } else {
            throw new InvalidInputError(keyArray);
        }
    }

    addKey(key){
        const ENUM = this.booleans;
        key = ensureUppercase(key);
        ENUM[key] = false;
    }

    addKeys(keyArray){
        keyArray.forEach( key => {
            this.addKey(key);
        })
    }

    select(key){
        key = ensureUppercase(key);

        const ENUM = this.booleans;

        Object.keys(ENUM).forEach(key => {
            ENUM[key] = false;
        });

        ENUM[key] = true;
    }

    valueOf(){
        const ENUM = this.booleans;
        
        return Object.keys(ENUM).find(key => ENUM[key]);
    }

    toString(fancy=false){
        const ENUM = this.booleans;
        const keyValuePairs = Object.keys(ENUM).map(key => `{${key}: ${ENUM[key]}}` );

        if(fancy){
            return `Enum {\n    ${keyValuePairs.join(',\n    ')}\n}`;
        } else {
            return `Enum {${keyValuePairs.join(',')}}`;
        }
    }
}

class InvalidInputError extends Error {
    constructor(invalidArray){
        throw new Error(`Enum declaration expected an array of keys, instead received: ${invalidArray}`)
    }
}

function ensureUppercase(key) {
    if (typeof key === "string") {
        return key.toUpperCase();
    } else {
        return key;
    }
}
