$(document).ready(function () {

    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let editFlag = 0, editKey;
    let checkedGender = "";

    $(".first-name").focusout(function () { checkName(this); });
    $(".middle-name").focusout(function () { checkName(this); })
    $(".last-name").focusout(function () { checkName(this); })
    $(".email").focusout(function () { checkEmail(this); })
    $(".pass").focusout(function () { checkPass(this); })
    $(".confirm-pass").focusout(function () { checkConfirmPass(this); })
    $(".city").focusout(function () { checAddress(this); })
    $(".state").focusout(function () { checAddress(this); })
    $(".country").focusout(function () { checAddress(this); })
    $(".zipcode").focusout(function () { checAddress(this); })
    $(".contact").focusout(function () { checkContact(this); })
    $(".gender").focusout(function () { checkGender(this); });

    $(".submit").click(function (e) {
        e.preventDefault();
        let id;
        if (editFlag == 1) {
            id = editKey;
            removeElement(editKey);
        } else {
            id = randomId();
        }

        if (validateFields()) {
            const tableData = {
                "id": id,
                "firstName": firstName.value.trim(),
                "middleName": middleName.value.trim(),
                "lastName": lastName.value.trim(),
                "email": email.value.trim(),
                "pass": password.value.trim(),
                "confirmPassword": confirmPass.value.trim(),
                "city": city.value.trim(),
                "state": state.value.trim(),
                "country": country.value.trim(),
                "zipcode": zipcode.value.trim(),
                "contact": contact.value.trim(),
                "genderData": checkedGender,
                "comment": comment.value.trim()
            }

            users.push(tableData);
            var a;

            if (localStorage.length > 0) {
                var data = JSON.parse(localStorage.getItem("tableData"));
                data.forEach(el => {
                    a = el.firstName;
                })

                users.forEach(el => {
                    if (el.firstName === a) {
                        alert("Entry already exists!");
                    } else {
                        localStorage.setItem("tableData", JSON.stringify(users));
                        alert("All Fields filled successfully!")
                        emptyFormFields();
                        createTable(users);
                    }
                })
            } else {
                localStorage.setItem("tableData", JSON.stringify(users));
                alert("All Fields filled successfully!")
                emptyFormFields();
                createTable(users);
            }
        }
    });

    function validateFields() {
        $(".gender").each(function (sub) {
            if (sub.checked) {
                checkedGender = sub.value;
            }
        });
        console.log(firstName);
        let isValidFirstName = checkName(firstName);
        let isValidMiddleName = checkName(middleName);
        let isValidLastName = checkName(lastName);
        let isValidEmail = checkEmail($(".email"));
        let isValidPassword = checkPass($(".pass"));
        let isValidConfirmPass = checkConfirmPass($(".confirm-pass"));
        let isValidCity = checAddress(city);
        let isValidState = checAddress(state);
        let isValidCountry = checAddress(country);
        let isValidZipcode = checAddress(zipcode);
        let isValidContact = checkContact($(".contact"));
        let isValidGender = checkGender(checkedGender);

        // check all form fields are valid or not
        if (!isValidFirstName || !isValidMiddleName || !isValidLastName || !isValidEmail
            || !isValidPassword || !isValidConfirmPass || !isValidCity
            || !isValidState || !isValidCountry || !isValidZipcode
            || !isValidContact || !isValidGender) {
            return false;
        } else {
            return true;
        }
    }

    function emptyFormFields() {
        firstName.value = "";
        middleName.value = ""
        lastName.value = "";
        email.value = "";
        password.value = "";
        confirmPass.value = "";
        city.value = "";
        state.value = "";
        country.value = "";
        zipcode.value = "";
        contact.value = "";
        gender.value = "";
        comment.value = "";

        gender.forEach(radio => {
            radio.checked = false;
        });
    }

    function randomId() {
        let num = Math.random() * 100;
        return num;
    }

    function checkName(fieldName) {
        const firstNameValue = $(fieldName).val();
        if (firstNameValue === "") {
            const errorText = "*this field is required!";
            const errorParent = $(fieldName).parent();

            showError(errorText, errorParent);
            return false;
        } else if (firstNameValue.length < 3) {
            const errorText = "*this field should be greater than 3 characters!";
            const errorParent = $(fieldName).parent();

            showError(errorText, errorParent);
            return false;

        } else if (!isNaN(firstNameValue)) {
            const errorText = "*this field should not have numbers!";
            const errorParent = $(fieldName).parent();

            showError(errorText, errorParent);
            return false;
        } else {
            showSuccess(fieldName);
            return true;
        }
    }

    function checkEmail(email) {
        const emailValue = $(email).val();

        if (emailValue === "") {
            const errorText = "*this field is required!";
            const errorParent = $(email).parent();
            showError(errorText, errorParent);
            return false;
        } else if (emailValue.match(emailPattern) == null) {
            const errorText = "*valid email is required!";
            const errorParent = $(email).parent();

            showError(errorText, errorParent);
            return false;
        } else {
            showSuccess(email);
            return true;
        }
    }

    function checkPass(password) {
        const passvalue = $(password).val();

        if (passvalue === "") {
            const errorText = "*this field is required!";
            const errorParent = $(password).parent();
            showError(errorText, errorParent);
            return false;
        } else if (passvalue.match(passwordPattern) == null) {
            const errorText = "*valid password is required!";
            const errorParent = $(password).parent();

            showError(errorText, errorParent);
            return false;
        }
        else {
            showSuccess(password);
            return true;
        }
    }

    function checkConfirmPass(confirmPass) {
        const passvalue = $(confirmPass).val();

        if (passvalue !== $(".pass").val()) {
            const errorText = "*confirm password should be equal to password!";
            const errorParent = $(confirmPass).parent();
            showError(errorText, errorParent);
            return false;
        } else if (passvalue === "") {
            const errorText = "*this field is required!";
            const errorParent = $(confirmPass).parent();
            showError(errorText, errorParent);
            return false;
        } else if (passvalue.match(passwordPattern) == null) {
            const errorText = "*valid password is required!";
            const errorParent = $(confirmPass).parent();

            showError(errorText, errorParent);
            return false;
        }
        else {
            showSuccess(confirmPass);
            return true;
        }
    }

    function checAddress(addressFields) {
        const cityValue = addressFields.value.trim();

        if (cityValue === "") {
            const errorText = "*this field is required!";
            const errorParent = addressFields.parentElement;

            showError(errorText, errorParent);
            return false;
        } else if (cityValue.length < 3) {
            const errorText = "*this field should be greater than 3 characters!";
            const errorParent = addressFields.parentElement;

            showError(errorText, errorParent);
            return false;
        }
        else {
            showSuccess(addressFields);
            return true;
        }
    }

    function checkContact(contact) {
        const contactValue = $(contact).val();

        if (contactValue === "") {
            const errorText = "*this field is required!";
            const errorParent = $(contact).parent();

            showError(errorText, errorParent);
            return false;
        } else if (contactValue.length < 10) {
            const errorText = "*number length  should not be more than 10"
            const errorParent = $(contact).parent();

            showError(errorText, errorParent);
            return false;
        }
        else {
            showSuccess(contact);
            return true;
        }
    }

    function checkGender(checkedGender) {
        if (checkedGender === "") {
            const errorText = "*this field is required!";
            const errorParent = $(".radio").parent();

            showError(errorText, errorParent);
            return false;
        } else {
            showSuccess($(".radio"));
            return true;
        }
    }

    function showError(errorText, errorParent) {
        const showError = $(errorParent).children(".error-text");
        if (showError && !null) {
            showError.remove();
        }
        const p = document.createElement("p");
        $(p).text(`${errorText}`)
        errorParent.append(p);
        $(p).addClass("error-text");

        $(errorParent).addClass("error");
        $(errorParent).removeClass("success");
    }

    function showSuccess(element) {
        const successParent = $(element).parent();
        const showError = $(successParent).children(".error-text");
        if (showError) {
            showError.remove();
        }
        successParent.addClass("success");
        successParent.removeClass("error");
    }
})