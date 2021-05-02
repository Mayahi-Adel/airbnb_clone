const checkInputs = (inputs, res) => {
    // constants
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;
    const NAME_REGEX = /^([a-zA-Z ]+)$/;

    const { email, first_name, last_name, password, role } = inputs;

    if (email == "" || password == "" || first_name == "" || last_name == "") {
        return {
            Status: (400),
            Msg: "missing parameters"
        }
    }

    if (!EMAIL_REGEX.test(email)) {
        return {
            Status: (400),
            Msg: "email is not valid"
        }
    }

    if (!PASSWORD_REGEX.test(password)) {
        return {
            Status: (400),
            Msg: "password invalid (must length 4 - 12 and include 1 number at least)"
        }
    }

    if (!NAME_REGEX.test(first_name)) {
        return {
            Status: (400),
            Msg: "first_name invalid (must be a string)"
        }
    }
    if (!NAME_REGEX.test(last_name)) {
        return {
            Status: (400),
            Msg: "last_name invalid (must be a string)"
        }
    }
}

module.exports = checkInputs