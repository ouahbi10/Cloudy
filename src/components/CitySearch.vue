<template>
  <div class="search">
    <div class="search_input">
      <input
        type="text"
        placeholder="Search Location"
        name="city_search"
        v-model="searchQuery"
        @input="getData"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="1.3rem"
      >
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
    </div>
    <Transition
      ><div class="search_result" v-if="searchQuery">
        <div
          v-for="city in searchResult"
          :key="city.name"
          @click="passData(city)"
        >
          <h6 v-if="city.state">{{ city.name }} , {{ city.state }}</h6>
          <h6 v-if="!city.state">{{ city.name }} , {{ city.country }}</h6>
        </div>
      </div></Transition
    >
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0;
  width: 100%;
}

.search .search_input {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #fff;
}

.search .search_input input {
  background: transparent;
  border: none;
  padding: 10px 5px;
  width: 100%;
  color: rgba(255, 255, 255, 0.7);
}
.search .search_input input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.search .search_input input:focus {
  outline: none;
}
.search .search_input svg {
  fill: white;
}

.search .search_result {
  width: 70%;
}
.search .search_result div {
  border-bottom: 1px rgba(119, 118, 118, 0.2) solid;
  color: white;
  padding: 10px 5px;
  cursor: pointer;
  transition: 0.4s ease-in-out;
}
.search .search_result div:hover {
  background-color: rgba(119, 118, 118, 0.4);
  color: #000;
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
  inject: ["emitter"],
  data() {
    return {
      searchQuery: "",
      searchResult: [],
      coord: {
        lat: "",
        lon: "",
        cityName: "",
      },
    };
  },
  methods: {
    async getData() {
      if (this.searchQuery.length === 0) return;

      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${this.searchQuery}&limit=4&appid=53eb0069d174e99a966a9bb6772f4f7e`
        );
        const data = await response.json();
        this.searchResult = data;
      } catch (error) {
        console.error(error);
      }
    },
    passData(city) {
      this.coord.lat = city.lat;
      this.coord.lon = city.lon;
      this.coord.cityName = city.name;
      this.searchQuery = "";
      this.emitter.emit("city-selected", this.coord);
    },
  },
};
</script>
