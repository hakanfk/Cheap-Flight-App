import axios from "axios";
import { API_KEY } from "@env";

export async function getAirport(city) {
  try {
    return await axios.request({
      method: "GET",
      url: "https://skyscanner50.p.rapidapi.com/api/v1/searchAirport",
      params: { query: city },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getFlight(origin, dest, date) {
  try {
    return await axios.request({
      method: "GET",
      url: "https://skyscanner50.p.rapidapi.com/api/v1/searchFlights",
      params: {
        origin: origin,
        destination: dest,
        date: date,
        adults: "1",
        currency: "USD",
        countryCode: "US",
        market: "en-US",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
  },
};

export async function getFlightInformation(id, origin, dest, date) {
  try {
    return await fetch(
      `https://skyscanner50.p.rapidapi.com/api/v1/getFlightDetails?itineraryId=${id}&legs=%5B%7B%22origin%22%3A%22${origin}%22%2C%22destination%22%3A%22${dest}%22%2C%22date%22%3A%22${date}%22%7D%5D&adults=1&currency=USD&countryCode=US&market=en-US`,
      options
    ).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
}
