<template>
  <Transition
    ><div v-if="isLoaded" class="weather-forecast">
      <h6>Today's Weather Forecast...</h6>
      <div class="weather-forecast-content">
        <div
          class="weather-forecast-item"
          v-for="item in searchResults.list"
          :key="item.dt"
        >
          <div class="weather-forecast-left">
            <div class="weather-forecast-content-icon">
              <img :src="weatherIconUrl(item.weather[0].icon)" alt="" />
            </div>
            <div class="weather-forecast-content-time">
              <h3>{{ getFormattedHour(item.dt, coord.lon) }}</h3>
              <h3>{{ item.weather[0].main }}</h3>
            </div>
          </div>
          <div class="weather-forecast-content-temp">
            <h3>{{ getTempCilicius(item.main.temp) }}°</h3>
          </div>
        </div>
      </div>
    </div></Transition
  >
</template>

<style lang="scss" scoped>
.weather-forecast {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 50px;
}
.weather-forecast h6 {
  color: rgba(255, 255, 255, 0.7);
}

.weather-forecast-content .weather-forecast-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.weather-forecast-content .weather-forecast-item .weather-forecast-left {
  display: flex;
  justify-content: center;
  align-content: center;
}
.weather-forecast-content
  .weather-forecast-item
  .weather-forecast-content-icon
  img {
  width: 70px;
}

.weather-forecast-content
  .weather-forecast-item
  .weather-forecast-content-time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
}

.weather-forecast-content
  .weather-forecast-item
  .weather-forecast-content-time
  h3 {
  color: rgba(255, 255, 255);
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
}
.weather-forecast-content
  .weather-forecast-item
  .weather-forecast-content-temp
  h3 {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  margin: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  data() {
    return {
      coord: {
        lat: "",
        lon: "",
      },
      isLoaded: false,
      searchResults: {},
      icons: [],
    };
  },
  methods: {
    async getWeatherHourly() {
      if (this.coord.lat.length === 0 || this.coord.lon.length === 0) return;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${this.coord.lat}&lon=${this.coord.lon}&appid=53eb0069d174e99a966a9bb6772f4f7e`
        );
        const data = await response.json();
        this.searchResults = await data;
        console.log(this.icons);
        this.isLoaded = true;
      } catch (error) {
        console.error(error);
      }
    },
    getFormattedHour(timestamp, lon) {
      const date = new Date(timestamp * 1000);
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = daysOfWeek[date.getUTCDay()]; // Get the day name

      const timezoneOffset = lon * 4 * 60 * 1000; // Calculate the timezone offset in milliseconds
      const localDate = new Date(date.getTime() + timezoneOffset); // Adjust the UTC time to local time

      const hours = localDate.getHours().toString().padStart(2, "0"); // Local hour
      const minutes = localDate.getMinutes().toString().padStart(2, "0"); // Local minutes
      return `${dayName} ${hours}:${minutes}`;
    },
    weatherIconUrl(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    },
    getTempCilicius(temp) {
      return Math.round(temp - 273.15);
    },
  },

  inject: ["emitter"],
  mounted() {
    this.emitter.on("city-selected", (city) => {
      this.coord.lat = city.lat;
      this.coord.lon = city.lon;
      this.getWeatherHourly();
    });
  },
};
</script>
