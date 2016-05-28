module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "mocha"
    ],
    "rules": {
      "mocha/no-exclusive-tests": 2,
      "mocha/no-skipped-tests": 2,
      "mocha/no-pending-tests": 2,
      "mocha/handle-done-callback": 2,
      "mocha/no-synchronous-tests": 2
    },
    "env": {
            "browser": true,
            "node": true,
            "mocha": true
    }
};
