(function () {
    "use strict";
    function hotelService($q, $http, API_URL, $httpParamSerializer, API_Extranet) {
        var vm = this;
        function GetTextMessagesAsString(culture, title) {

            return $http({
                url: API_URL.URL + "Home/GetTextMessagesAsString?culture=" + culture + "&title=" + title,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function updateHotelSearchHistory(userId, hotelId) {
            return getIpAddress().then(function (result) {

                return $http({
                    url: API_URL.URL + "Hotel/UpdateHotelSearchHistory?userId=" + userId + "&hotelId=" + hotelId + "&ipAddress=" + result,
                    dataType: 'json',
                    method: 'GET',
                }).then(function (response) {
                    return response.data;
                }).catch(function (error) {
                    return $q.reject(error.data);
                });

            }, function (e) {
                return $q.reject(e);
            });

        }

        function saveContactUsData(contactUsData) {
            return $http({
                url: API_URL.URL + "contactus/InsertContactUs",
                method: "POST",
                data: contactUsData,
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function forgetPassword(email, culture) {
            return $http({
                url: API_URL.URL + "home/ForgetPassword?emailId=" + email + "&culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function resetPassword(password, userId) {
            return $http({
                url: API_URL.URL + "home/ResetPassword?password=" + password + "&userId=" + userId,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getIpAddress() {
            var json = "";
            if (window.location.href.indexOf("https") != -1) {
                json = 'https://ipv4.myexternalip.com/json';
            }
            else {
                json = 'http://ipv4.myexternalip.com/json';
            }
            return $http.get(json).then(function (result) {
                return result.data.ip;
            }, function (e) {
                return e;
            });
        }

        function getEmailSubject(culture) {
            return $http({
                url: API_URL.URL + "contactus/GetSubject?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getInternet(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyFacilities?culture=" + culture + "&attributeHeaderId=6",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getParking(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyFacilities?culture=" + culture + "&attributeHeaderId=7",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }


        function GetRoomFacilities(culture) {
            return $http({
                url: API_URL.URL + "home/GetHotelRoomAttribute?culture=en",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getRoomView(culture) {
            return $http({
                url: API_URL.URL + "property/GetRoomViewType?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getSmokingStatus(culture) {
            return $http({
                url: API_URL.URL + "property/GetSmokingType?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getRoomType(culture) {
            return $http({
                url: API_URL.URL + "property/GetRoomType?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getDomesticAnimal(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyFacilities?culture=" + culture + "&attributeHeaderId=8",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getChildrenPolicy(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyFacilities?culture=" + culture + "&attributeHeaderId=9",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getExtraBedList(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyFacilities?culture=" + culture + "&attributeHeaderId=5",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getBabyCoat(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyFacilities?culture=" + culture + "&attributeHeaderId=4",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getChannelManager() {
            return $http({
                url: API_URL.URL + "property/GetChannelManager",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getCreditCard() {
            return $http({
                url: API_URL.URL + "property/GetCreditCards",
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getPropertyReservationCurrency(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyReservationCurrency?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getHotelCountsByCountry() {

        }

        function getPropertyAccommodationList(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyAccommodation?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getPropertyClass(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyClass?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getPropertyType(culture) {
            return $http({
                url: API_URL.URL + "property/GetPropertyType?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getCityForDropdownByCountryId(countryId, culture) {
            return $http({
                url: API_URL.URL + "property/GetCity?countryId=" + countryId + "&culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getCountryForDropdown(culture) {
            return $http({
                url: API_URL.URL + "property/GetCountry?culture=" + culture,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        // Home Services 
        function loginToGbsHotels(email, password) {
            var login = { email: email, password: password };
            return $http({
                url: API_URL.URL + "Home/UserLogin",
                method: "POST",
                data: login
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error.data);
            });

        }

        function registerNewUser(registerUserName, registerPassword, registerEmail, Culture) {
            var data = { username: registerUserName, password: registerPassword, Email: registerEmail, Culture: Culture };
            return $http({
                url: API_URL.URL + "Home/CheckEmail",
                method: "POST",
                data: data,
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function sendSubscribe(subscription) {
            return $http({
                url: API_URL.URL + "Home/PostSubscription",
                method: 'POST',
                data: subscription
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getCulture() {
            return $http({
                url: API_URL.URL + "Home/GetCulture",
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getLatestNews(culture) {
            return $http({
                url: API_URL.URL + "Home/GetLatestNews?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getPopularHotel(culture, currency) {
            return $http({
                url: API_URL.URL + "Home/GetPopularHotel",
                params:{
                    culture:   culture ,
                     currency: currency
                },
                method: "POST",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getRecentHotel(culture, currency) {
            return $http({
                url: API_URL.URL + "Home/GetRecentHotel", 
                params: {
                    culture: culture,
                    currency: currency
                },
                method: "POST",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getCurrencyLoad(culture) {
            return $http({
                url: API_URL.URL + "Home/GetCurrencyLoad?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getPopularDestination(culture) {
            return $http({
                url: API_URL.URL + "Home/GetPopularDestination?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });

        }

        function getContinentsCountry(culture) {
            return $http({
                url: API_URL.URL + "Home/GetContinentsCountry?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });

        }

        function getContinents(culture) {
            return $http({
                url: API_URL.URL + "Home/GetContinents?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });

        }

        function getCountryWithContinents(culture, continetId) {
            return $http({
                url: API_URL.URL + "Home/GetDetinationsWithContinents?culture=" + culture + "&continetId=" + continetId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });

        }

        function getWhyGbshotelsText(culture) {
            return $http({
                url: API_URL.URL + "Home/GetWhyGbshotelsText?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getMyWishlistsMaster(culture, userId) {
            return $http({
                url: API_URL.URL + "Home/GetMyWishlistsMaster?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getHotelCount() {
            return $http({
                url: API_URL.URL + "Home/GetHotelCount",
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        // Tearm and Condition Service
        function getTermsCondition(culture) {
            return $http({
                url: API_URL.URL + "TermsConditions/GetTermsCondition?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        // FAQ Service
        function getFAQ(culture) {
            return $http({
                url: API_URL.URL + "Faq/GetFAQ?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        // Aboutus Service
        function getAboutUs(culture) {
            return $http({
                url: API_URL.URL + "AboutUs/GetAboutUs?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //Common Service
        function getTextMessage(culture, messageCode, labelId) {
            var model = { Culture: culture, MessageCode: messageCode, LblId: labelId }
            return $http({
                url: API_URL.URL + "Home/GetTextMessage",
                method: "POST",
                data: model,
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getReservationData(reservationId) {
            return $http({
                url: API_URL.URL + "Home/UserShowReservation",
                method: "POST",
                data: reservationId
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //Header Service
        function showReservation(reservationId, pinCode, culture) {
            var reservation = { ReservationId: reservationId, PinCode: pinCode, Culture: culture }
            return $http({
                url: API_URL.URL + "Home/ShowReservation",
                method: "POST",
                data: reservation
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //Profile Service

        function getRecentActiveReservation(culture, userId) {
            return $http({
                url: API_URL.URL + "Profile/GetRecentActiveReservation?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getYourReservation(culture, userId) {
            return $http({
                url: API_URL.URL + "Profile/GetYourReservation?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getProfileDetails(culture, userId) {
            return $http({
                url: API_URL.URL + "Profile/GetProfileDetails?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getUserDashboardDetails(culture, userId) {
            return $http({
                url: API_URL.URL + "Profile/GetUserDashboardDetails?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getMyWishlists(culture, userId) {
            return $http({
                url: API_URL.URL + "Profile/GetMyWishlists?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function insertIntoWishlist(userId, hotelId) {
            return $http({
                url: API_URL.URL + "Profile/InsertIntoWishlist?userId=" + userId + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //check user wishlist status
        function checkuserWishlistStaus(userId, hotelId) {
            if (!userId) {
                return;
            }
            
            return $http({
                
                url: API_URL.URL + "Profile/CheckuserWishlistStaus?userId=" + userId + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }


        function getUserCreditCard(culture, userId) {
            return $http({
                url: API_URL.URL + "Profile/GetUserCreditCard?culture=" + culture + "&userId=" + userId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return error.data;
            });
        }
        //HotelDetail Service
        function getHotelSlideShowImage(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetHotelSlideShowImage?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getHotelMainregion(CurrentCulture, HotelID, RegionID, CountryID) {
            return $http({
                url: API_URL.URL + "hotel/GetHotelMainregion?CurrentCulture=" + CurrentCulture + "&HotelID=" + HotelID + "&RegionID=" + RegionID + "&CountryID=" + CountryID,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //new service added by Tomas given : 1st December
        function getHotelPolicy(HotelID) {
            try{ 
                return $http({
                    url: API_Extranet.URL + "propertyPolicies/getPropertyPolicySummary?hotelID=" + HotelID,
                    //params:{
                    //    hotelID : HotelID 
                    //},
                    method: "GET"
                }).then(function (response) {
                    return response.data;
                }).catch(function (error) {
                    // return $q.reject(error.data);
                    return null;
                });
            }
            catch (err) {
                console.log("error: Property polciy not fetching from extranet url ,"+err)
                return null;
            }
        }
        function getHotelsLocationByHotelID(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetHotelsLocationByHotelID?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getReservationReviews(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetReservationReviews?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getSummary(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetSummary?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getAllReviews(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetAllReviews?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getRoomAvailabilityDetails(culture, hotelId, currentCurrency) {
            return $http({
                url: API_URL.URL + "hotel/GetRoomAvailabilityDetails?culture=" + culture + "&hotelId=" + hotelId + "&currentCurrency=" + currentCurrency,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getTypeReview(culture) {
            return $http({
                url: API_URL.URL + "hotel/GetTypeReview?culture=" + culture,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getHotelBasicInfo(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetHotelBasicInfo?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getHotelSpecifications(culture, hotelId) {
            return $http({
                url: API_URL.URL + "hotel/GetHotelSpecifications?culture=" + culture + "&hotelId=" + hotelId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function updateProfile(profileData) {
            return $http({
                url: API_URL.URL + "profile/UpdateProfile",
                method: "POST",
                data: profileData
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function saveCrediCard(cardDetail) {
            return $http({
                url: API_URL.URL + "profile/CheckCrediCard",
                method: "POST",
                data: cardDetail
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function changePassword(userId, oldPassword, newPassword) {
            var obj = {
                "UserId": userId,
                "OldPassword": oldPassword,
                "NewPassword": newPassword
            };
            return $http({
                url: API_URL.URL + "profile/ChangePassword",
                method: "POST",
                data: obj
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function sendVarificationCode(code) {
            return $http({
                url: API_URL.URL + "Home/CheckVerificationCode?verificationCode=" + code,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function updateCard(creditCard) {
            return $http({
                url: API_URL.URL + "profile/UpdateCreditCard",
                method: "POST",
                data: creditCard
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function saveProperty(property) {
            return $http({
                url: API_URL.URL + "Property/SavePropertyInfo",
                method: "POST",
                data: property
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function removeCard(cardId) {
            return $http({
                url: API_URL.URL + "profile/RemoveCreditCard?id=" + cardId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getCancelationPolicy(culture) {
            return $http({
                url: API_URL.URL + "property/GetSettingPenaltyRate?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function writereView(culture) {
            return $http({
                url: API_URL.URL + "Home/WritereView?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getTypeReview(culture) {
            return $http({
                url: API_URL.URL + "Home/GetTypeReview?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function insertReview(review) {
            return $http({
                url: API_URL.URL + "Home/InsertReview",
                method: "POST",
                data: review
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function checkRoomAvailbility(culture, hotelId, dateFrom, dateTo, currentCurrency) {
            return $http({
                url: API_URL.URL + "hotel/CheckRoomAvailbility?culture=" + culture + "&hotelId=" + hotelId + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&currentCurrency=" + currentCurrency,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getHotelPromotion(culture, hotelId, dateFrom, dateTo) {
            return $http({
                url: API_URL.URL + "hotel/GetHotelPromotion?culture=" + culture + "&hotelId=" + hotelId + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo ,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //City service
        function getCity(cityId, culture) {
            return $http({
                url: API_URL.URL + "City/GetCity?cityId=" + cityId + "&culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getHotels(cityId, culture, currency) {
            return $http({
                url: API_URL.URL + "City/GetHotels?cityId=" + cityId + "&culture=" + culture + "&currency=" + currency,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getRegions(cityId, culture) {
            return $http({
                url: API_URL.URL + "City/GetRegions?culture=" + culture + "&regionId=" + cityId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //function getHotelsLocation(cityId, culture,hids) {
        //    return $http({
        //        url: API_URL.URL + "City/GetHotelsLocation",
        //        method: "POST",
        //        params: {
        //            culture: culture ,
        //            regionId: cityId,
        //            hids:hids
        //        }
        //    }).then(function (response) {
        //        return response.data;
        //    }).catch(function (error) {
        //        return $q.reject(error.data);
        //    });
        //}
        function getSearchHotels(search) {
            return $http({
                url: API_URL.URL + "City/GetSearchHotels",
                method: "POST",
                data: search
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }


        function saveHotelReview(review) {
            return $http({
                url: API_URL.URL + "Home/InsertReview",
                method: "POST",
                data: review
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //UPDATE HOTEL RESERVATION
        function updatereservationdetails(updateData) {
            return $http({
                url: API_URL.URL + "Home/Updatereservationdetails?Culturecode="+updateData.Culturecode+"&reservationid="+updateData.reservationid+"&guestname="+ updateData.guestname+"&bedselectionno="+updateData.bedselectionno+"&travelertype="+updateData.travelertype+"&drptime="+updateData.drptime+"&RoomID="+updateData.RoomID+"&reservationEmail="+updateData.reservationEmail,
                method: "GET"
                //,data: updateData
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //cancelSelectedItems HOTEL RESERVATION
        function cancelSelectedItems(updateData) {
            return $http({
                // , string , string , string , string ,
                //string , string , string , string , string , string 
                url: API_URL.URL + "Home/CancelSelectedItems?CultureCode=" + updateData.CultureCode
                    + "&UserID=" + updateData.UserID
                    + "&FullName=" + updateData.FullName
                    + "&HotelID=" + updateData.HotelID
                    + "&ReservationID=" + updateData.ReservationID
                    + "&CurrencySymbol=" + updateData.CurrencySymbol
                    + "&CheckInDate=" + updateData.CheckInDate
                    + "&CheckOutDate=" + updateData.CheckOutDate
                    + "&HotelRoomID=" + updateData.HotelRoomID
                    + "&HotelReservationID=" + updateData.HotelReservationID
                    + "&ActiveStatus=" + updateData.ActiveStatus
                    + "&amountvalue=" + updateData.amountvalue
                    + "&ReservationAmount=" + updateData.ReservationAmount
                    + "&HotelRoomIDChecked=" + updateData.HotelRoomIDChecked
                ,
                method: "GET"
                
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //search Service
        function getRecentlyviewdHotels(culture, userId) {
            return $http({
                url: API_URL.URL + "Home/GetRecentlyviewdHotels?culture=" + culture + "&userId=" + userId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function DeleteMyViewedHotels(Id, userId) {
            return $http({
                url: API_URL.URL + "Home/DeleteMyViewedHotels?Id=" + Id + "&userId=" + userId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getFeaturedHotelSearch(currentCurrency, culture, regionId, checkInDate, checkOutDate, roomCount, adultcount, childrenCount, pageSize, pageIndex) {
            return $http({
                url: API_URL.URL + "Search/GetFeaturedHotelSearch?currentCurrency=" + currentCurrency + "&culture=" + culture + "&regionId=" + regionId + "&checkInDate=" + checkInDate + "&checkOutDate=" + checkOutDate + "&roomCount=" + roomCount + "&adultcount=" + adultcount + "&childrenCount=" + childrenCount + "&pageSize=" + pageSize + "&pageIndex=" + pageIndex,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function filterHotelDetails(currentCurrency, culture, typeHotelClass, typeHotel, typeFacilities, typeRegion, currencyId,
            startBudgetValue, endBudgetValue, selectedSortValue, checkInDate, checkOutDate, regionID, pageSize, pageIndex, roomCount, adultcount, childrencount) {
            return $http({
                url: API_URL.URL + "Search/FilterHotelDetails?currentCurrency=" + currentCurrency + "&culture=" + culture + "&typeHotelClass=" + typeHotelClass + "&typeHotel=" + typeHotel + "&typeFacilities=" + typeFacilities + "&typeRegion=" + typeRegion + "&currencyId=" + currencyId +
                    "&startBudgetValue=" + startBudgetValue + "&endBudgetValue=" + endBudgetValue + "&selectedSortValue=" + selectedSortValue + "&checkInDate=" + checkInDate + "&checkOutDate=" + checkOutDate + "&regionID=" + regionID + "&pageSize=" + pageSize +
               "&pageIndex=" + pageIndex + "&roomCount=" + roomCount + "&adultcount=" + adultcount + "&childrencount=" + childrencount,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }


        //Region Service
        function getHotelRegions(culture, countryId) {
            return $http({
                url: API_URL.URL + "Region/GetHotelRegions?culture=" + culture + "&countryId=" + countryId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getCountryRegions(culture, countryId) {
            return $http({
                url: API_URL.URL + "Region/GetCountryRegions?culture=" + culture + "&countryId=" + countryId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getRoutingDetails(HotelId, DestinationName, GuestCountdetails) {
            return $http({
                url: API_URL.URL + "Region/GetRoutingDetails?HotelId=" + HotelId + "&DestinationName=" + DestinationName + "&GuestCountdetails=" + GuestCountdetails,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //Home Service
        function getDestinationSearchResult(culture, keyword, countryId) {
            return $http({
                url: API_URL.URL + "Home/GetDestinationSearchResult?culture=" + culture + "&keyword=" + keyword + "&countryId=" + countryId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getDestinationSearchResultById(culture, regionId, regionName) {
            return $http({
                url: API_URL.URL + "Home/GetDestinationSearchResultById?culture=" + culture + "&regionId=" + regionId + "&regionName=" + regionName,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //Searh Service
        function getSortValues(culture) {
            return $http({
                url: API_URL.URL + "Search/GetSortValues?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getPropertyFacilities(culture) {
            return $http({
                url: API_URL.URL + "Search/GetPropertyFacilities?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //Search Region
        function getRegionsSearch(cultureId, RegionId) {
            return $http({
                url: API_URL.URL + "Search/GetRegions?culture=" + cultureId + "&regionId=" + RegionId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //hids: Hotel IDS to filter that location detail in callback
        function getHotelsLocation(cultureId, RegionId, zhids) {
            return $http({
                url: API_URL.URL + "Search/getHotelsLocation",
                method: "POST",
                        params: {
                            culture: cultureId,
                            regionId: RegionId,
                            zhids: zhids
                        }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //get rgion for search Service
        function getPropertyRegion(cultureId, RegionId) {
            return $http({
                url: API_URL.URL + "Home/GetPropertyRegion?CultureId=" + cultureId+"&RegionId="+RegionId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //External Login service
        function checksocialidvalidation(fbid, googleid, emailid) {
            return $http({
                url: API_URL.URL + "Home/Checksocialidvalidation?fbid=" + fbid + "&googleid=" + googleid + "&emailid=" + emailid,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function socialLoginInsert(fbid, googleid, emailid, Name, Gender, Image, culture) {
            return getIpAddress().then(function (result) {

                return $http({
                    url: API_URL.URL + "Home/SocialLoginInsert?fbid=" + fbid + "&googleid=" + googleid + "&emailid=" + emailid + "&Name=" + Name + "&Gender=" + Gender + "&Image=" + Image + "&ipAddress=" + result + "&culture=" + culture,
                    dataType: 'json',
                    method: 'GET',
                }).then(function (response) {
                    return response.data;
                }).catch(function (error) {
                    return $q.reject(error.data);
                });

            }, function (e) {
                return $q.reject(e);
            });

        }
        //Hotel Detail
        function storeHotelRoomInfo(culture, checkDatefrom, checkDateto, hotelCity, hotelId, address, mainPhotoName,
            hotelClass, hotelname, roomId, uniqueId, accommodationTypeId, accommodationTypeName, accommodationTypeDescription, pricePolicyTypeId, pricePolicyTypeName, singleRate, doubleRate,
            dailyRoomPrices, originalRoomPrice, currencyId, currencySymbol, roomCount, MaxPeopleCount, roomPriceVal, currencyCodeval, hiddenRoomTypeval,
            hiddenPriceTypeval, creditCardNotRequiredValue, currentCurrency) {
            var storeBookingInfo = {
                culture:culture, checkDatefrom :checkDatefrom, checkDateto:checkDateto, 
                hotelCity:hotelCity, hotelId:hotelId, address:address, mainPhotoName:mainPhotoName,
                hotelClass:hotelClass, hotelname:hotelname, roomId:roomId, uniqueId:uniqueId, accommodationTypeId:accommodationTypeId, 
                accommodationTypeName:accommodationTypeName, accommodationTypeDescription:accommodationTypeDescription, pricePolicyTypeId:pricePolicyTypeId, 
                pricePolicyTypeName:pricePolicyTypeName, singleRate:singleRate, doubleRate:doubleRate,
                dailyRoomPrices:dailyRoomPrices, originalRoomPrice:originalRoomPrice, currencyId:currencyId, currencySymbol:currencySymbol, 
                roomCount:roomCount, MaxPeopleCount:MaxPeopleCount, roomPriceVal:roomPriceVal, currencyCodeval:currencyCodeval, hiddenRoomTypeval:hiddenRoomTypeval,
                hiddenPriceTypeval: hiddenPriceTypeval, creditCardNotRequiredValue: creditCardNotRequiredValue, currentCurrency: currentCurrency
            }
            return $http({
                url: API_URL.URL + "Booking/StoreHotelRoomInfo",
                method: "POST",
                data: storeBookingInfo
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //Booking Service 
        function getProfileDetailsIfAvailable(culture, userId) {
            return $http({
                url: API_URL.URL + "Booking/GetProfileDetailsIfAvailable?culture=" + culture + "&userId=" + userId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //call after change data call on booking controller
        function getValuesWhileChangelangRe(jsonObj) {
            return $http({
                url: API_URL.URL + "Booking/GetValuesWhileChangelangRe",
                method: "POST",
                params: {
                    currentCurrency: jsonObj.currentCurrency,
                    culture: jsonObj.culture,
                    hotelId: jsonObj.hotelId,
                    roomPriceTypeId: jsonObj.roomPriceTypeId,
                    checkDatefrom: jsonObj.checkDatefrom,
                    checkDateTo: jsonObj.checkDateTo,
                    roomCountHId: jsonObj.roomCountHId,
                    policyTypeId: jsonObj.policyTypeId
                    , hotelRoomIdAry: jsonObj.hotelRoomIdAry
                }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function changeBookingDate(
                    checkin
                   , checkout
                   , Session_PolicyTypeID
                   , Session_StoreHotelID
                   , Session_Code
                   , Session_RoomPriceTypeID
                   , Session_RoomCountHid
                   , Session_HotelRoomIDAry
                  ) {
            return $http({
                url: API_URL.URL + "Booking/changeBookingDate",
                method: "POST",
                params: {
                    checkin:checkin
                 , checkout:checkout
                 , Session_PolicyTypeID:Session_PolicyTypeID
                 , Session_StoreHotelID:Session_StoreHotelID
                 , Session_Code:Session_Code
                 , Session_RoomPriceTypeID:Session_RoomPriceTypeID
                 , Session_RoomCountHid:Session_RoomCountHid
                 , Session_HotelRoomIDAry: Session_HotelRoomIDAry
                }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getUserSavedCardDetailsByHotel(userId, hotelId) {
            return $http({
                url: API_URL.URL + "Booking/GetUserSavedCardDetailsByHotel?userId=" + userId + "&hotelId=" + hotelId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function hotelReservationFunc(TotalPricewithTax, title, Name, SurName, Email, Phone, Country,
            CreditcardProvider, NameOnCreditcard, CreditcardNumber, CVCCode, ExpirationMonth,
            ExpirationYear, HotelID, CheckinDate, CheckOutDate, PayableAmount, Culturecode,
            LoggedUserID, HiidenCurrencyCode, SpecialNote, HotelName, RoomCount, PriceType,
            Guestname, SelectBedType, TavellerTypeSelect, EstimatedArrivalTimeSelect, HotelRoomID,
            SelectBedTypeID, TavellerTypeSelectID, PricePolicyType, CreditCardNotRequired, culture, HasDiscount) {



            return $http({
                url: API_URL.URL+"Booking/HotelReservationFunc",
                method: "POST",

                 
                params: {
                    "CVCCode" : CVCCode  
                    ,"CheckOutDate" : CheckOutDate  
                    ,"CheckinDate" : CheckinDate  
                    , "Country": Country
                    ,"CreditCardNotRequired" : CreditCardNotRequired 
                    ,"CreditcardNumber" :  CreditcardNumber 
                    ,"CreditcardProvider" :  CreditcardProvider 
                    ,"Culturecode" : Culturecode
                    ,"Email" : Email  
                    ,"EstimatedArrivalTimeSelect" : EstimatedArrivalTimeSelect 
                    ,"ExpirationMonth" : ExpirationMonth 
                    ,"ExpirationYear":   ExpirationYear  
                    ,"Guestname" : Guestname 
                    ,"HasDiscount" : HasDiscount
                    ,"HiidenCurrencyCode" : HiidenCurrencyCode 
                    ,"HotelID" : HotelID 
                    ,"HotelName" : HotelName  
                    ,"HotelRoomID" : HotelRoomID
                    ,"LoggedUserID" : LoggedUserID 
                    ,"Name" : Name 
                    ,"NameOnCreditcard" : NameOnCreditcard 
                    ,"PayableAmount" : PayableAmount  
                    ,"Phone" : Phone
                    ,"PricePolicyType" : PricePolicyType  
                    , "PriceType": PriceType
                    , "RoomCount": RoomCount
                    , "SelectBedType": SelectBedType
                    , "SelectBedTypeID": SelectBedTypeID
                    , "SpecialNote": SpecialNote
                    , "SurName": SurName
                     ,"TavellerTypeSelect": TavellerTypeSelect
                    , "TavellerTypeSelectID": TavellerTypeSelectID
                    , "TotalPricewithTax": TotalPricewithTax
                    , "culture": culture
                     , "title": title
                      }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function typeTraveller(culture) {
            return $http({
                url: API_URL.URL + "Booking/TypeTraveller?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getSalutation(culture) {
            return $http({
                url: API_URL.URL + "Booking/GetSalutation?culture=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        //booking module service
        function typeMonth(culture) {
            return $http({
                url: API_URL.URL + "Booking/TypeMonth?Cultureid=" + culture,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function typeCreditCardByHotel(culture, hotelId) {
            return $http({
                url: API_URL.URL + "Booking/typeCreditCardByHotel?Cultureid=" + culture + "&HotelID=" + hotelId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //get hotel specifications
        function getHotelRoomPopUpDetails(RoomId,CultureID, HotelId) {
            return $http({
                url: API_URL.URL + "Home/GetHotelRoomPopUpDetails?RoomId=" + RoomId + "&CultureID=" + CultureID + "&HotelId=" + HotelId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        var service =
            {
                getSalutation:getSalutation,
                typeTraveller:typeTraveller,
                hotelReservationFunc: hotelReservationFunc,
                getUserSavedCardDetailsByHotel:getUserSavedCardDetailsByHotel,
                getProfileDetailsIfAvailable: getProfileDetailsIfAvailable,
                changeBookingDate: changeBookingDate,
                getValuesWhileChangelangRe:getValuesWhileChangelangRe,
                storeHotelRoomInfo:storeHotelRoomInfo,
                getPropertyFacilities:getPropertyFacilities,
                getDestinationSearchResultById:getDestinationSearchResultById,
                checksocialidvalidation: checksocialidvalidation,
                socialLoginInsert:socialLoginInsert,
                filterHotelDetails: filterHotelDetails,
                getFeaturedHotelSearch: getFeaturedHotelSearch,
                getSortValues: getSortValues,
                checkRoomAvailbility: checkRoomAvailbility,
                getHotelPromotion:getHotelPromotion,
                getRoutingDetails: getRoutingDetails,
                getCountryRegions: getCountryRegions,
                updateHotelSearchHistory: updateHotelSearchHistory,
                getDestinationSearchResult: getDestinationSearchResult,
                getHotelRegions: getHotelRegions,
                getMyWishlistsMaster: getMyWishlistsMaster,
                getHotelMainregion: getHotelMainregion,
                getRegionsSearch: getRegionsSearch,
                getHotelsLocation:getHotelsLocation,
                // new added on 1st Dec 2016
                getHotelPolicy: getHotelPolicy,
                getHotelsLocationByHotelID: getHotelsLocationByHotelID,
                getRecentlyviewdHotels: getRecentlyviewdHotels,
                DeleteMyViewedHotels: DeleteMyViewedHotels,
                getCity: getCity,
                getSearchHotels: getSearchHotels,
                getRegions: getRegions,
                getHotels: getHotels,
                //getHotelsLocation: getHotelsLocation,
                insertReview: insertReview,
                getTypeReview: getTypeReview,
                writereView: writereView,
                saveCrediCard: saveCrediCard,
                resetPassword: resetPassword,
                getRoomAvailabilityDetails: getRoomAvailabilityDetails,
                getUserCreditCard: getUserCreditCard,
                getHotelBasicInfo: getHotelBasicInfo,
                getHotelSpecifications: getHotelSpecifications,
                getHotelCountsByCountry: getHotelCountsByCountry,
                loginToGbsHotels: loginToGbsHotels,
                registerNewUser: registerNewUser,
                sendSubscribe: sendSubscribe,
                getCulture: getCulture,
                getLatestNews: getLatestNews,
                getPopularHotel: getPopularHotel,
                getRecentHotel: getRecentHotel,
                getCurrencyLoad: getCurrencyLoad,
                getTermsCondition: getTermsCondition,
                getFAQ: getFAQ,
                getAboutUs: getAboutUs,
                getTextMessage: getTextMessage,
                getCountryForDropdown: getCountryForDropdown,
                getCityForDropdownByCountryId: getCityForDropdownByCountryId,
                getPropertyType: getPropertyType,
                getPropertyClass: getPropertyClass,
                getPropertyAccommodationList: getPropertyAccommodationList,
                getPropertyReservationCurrency: getPropertyReservationCurrency,
                getCreditCard: getCreditCard,
                getChannelManager: getChannelManager,
                getBabyCoat: getBabyCoat,
                getExtraBedList: getExtraBedList,
                getChildrenPolicy: getChildrenPolicy,
                getRoomType: getRoomType,
                getSmokingStatus: getSmokingStatus,
                getRoomView: getRoomView,
                GetRoomFacilities: GetRoomFacilities,
                showReservation: showReservation,
                getPopularDestination: getPopularDestination,
                getContinentsCountry: getContinentsCountry,
                getContinents: getContinents,
                getCountryWithContinents: getCountryWithContinents,
                getWhyGbshotelsText: getWhyGbshotelsText,
                getHotelCount: getHotelCount,
                getRecentActiveReservation: getRecentActiveReservation,
                getYourReservation: getYourReservation,
                getDomesticAnimal: getDomesticAnimal,
                getParking: getParking,
                getInternet: getInternet,
                getEmailSubject: getEmailSubject,
                getIpAddress: getIpAddress,
                saveContactUsData: saveContactUsData,
                getReservationData: getReservationData,
                getProfileDetails: getProfileDetails,
                getHotelSlideShowImage: getHotelSlideShowImage,
                getReservationReviews: getReservationReviews,
                getSummary: getSummary,
                changePassword: changePassword,
                updateProfile: updateProfile,
                getUserDashboardDetails: getUserDashboardDetails,
                forgetPassword: forgetPassword,
                getMyWishlists: getMyWishlists,
                insertIntoWishlist: insertIntoWishlist,
                checkuserWishlistStaus:checkuserWishlistStaus,
                sendVarificationCode: sendVarificationCode,
                updateCard: updateCard,
                removeCard: removeCard,
                getAllReviews: getAllReviews,
                saveProperty: saveProperty,
                getCancelationPolicy: getCancelationPolicy,
                saveHotelReview: saveHotelReview,
                updatereservationdetails: updatereservationdetails,
                cancelSelectedItems:cancelSelectedItems,
                GetTextMessagesAsString: GetTextMessagesAsString,
                getPropertyRegion: getPropertyRegion,
                getHotelRoomPopUpDetails:getHotelRoomPopUpDetails//get photos specifications
                ,typeMonth:typeMonth
                ,typeCreditCardByHotel: typeCreditCardByHotel
            }
        return service;
    }

    angular
    .module("app")
    .service("hotelService", hotelService);
    hotelService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer","API_Extranet"]
})();