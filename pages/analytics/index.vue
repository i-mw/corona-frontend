<template>
  <div class="flex flex-wrap">
    <SidebarNav></SidebarNav>

    <div class="w-full lg:w-5/6 px-5 pt-2 bg-gray-200">
      <div class="pl-2">
        <p class="text-2xl font-bold">COVID-19 {{ $t('Overview') }}</p>

        <p class="text-xs font-bold leading-tight my-2 text-gray-600">
          {{ $t('Sources') }}: WHO, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, {{ $t('and various international media') }}
        </p>
      </div>

      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 px-2">
          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <div class="flex flex-col lg:flex-row">
              <div class="px-5">
                <p class="text-sm font-bold text-red-600">{{ $t('Total Confirmed') }}</p>
                <p class="text-4xl font-bold text-red-600">{{ confirmed | formatNumber }}</p>
              </div>

              <div class="px-5">
                <p class="text-sm font-bold text-green-600">{{ $t('Total Recovered') }}</p>
                <p class="text-4xl font-bold text-green-600">{{ recovered | formatNumber }}</p>
              </div>

              <div class="px-5">
                <p class="text-sm font-bold text-gray-600">{{ $t('Total Deaths') }}</p>
                <p class="text-4xl font-bold text-gray-600">{{ deaths | formatNumber }}</p>
              </div>
            </div>
          </div>

          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <OutbreakTrendChart :data="outbreakTrendData"></OutbreakTrendChart>
          </div>

          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <AffectedRegion :data="affectedRegionData"></AffectedRegion>
          </div>
        </div>

        <div class="w-full lg:w-1/2 px-2">
          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <AffectedCountry :data="affectedCountryData"></AffectedCountry>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNav from '~/components/Analytics/SidebarNav'
import OutbreakTrendChart from '~/components/Analytics/OutbreakTrend'
import AffectedRegion from '~/components/Analytics/AffectedRegion'
import AffectedCountry from '~/components/Analytics/AffectedCountry'

export default {
  components: { SidebarNav, OutbreakTrendChart, AffectedRegion, AffectedCountry },
  
  mounted () {
    this.loadStats()
    this.loadOutbreakTrend()
    this.loadAffectedRegion()
    this.loadAffectedCountry()
  },

  data () {
    return {
      currentDate: new Date,
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      outbreakTrendData: [],
      affectedRegionData: [],
      affectedCountryData: [],
    }
  },

  metaInfo: {
    title: 'Analytics',
  },

  methods: {
    loadStats () {
      this.$api.stats.getStats('')
        .then(data => {
          this.confirmed = data.confirmed
          this.deaths = data.deaths
          this.recovered = data.recovered
        })
    },

    loadOutbreakTrend () {
      this.$api.analytics.fetchTrendByDate('2020-01-27', this.currentDate.toISOString().slice(0, 10))
        .then(data => {
          this.outbreakTrendData = data
        })
    },

    loadAffectedRegion () {
      this.$api.analytics.fetchAffectedRegion()
        .then(data => {
          this.affectedRegionData = data
        })
    },

    loadAffectedCountry () {
      this.$api.analytics.fetchAffectedCountry()
        .then(data => {
          this.affectedCountryData = data
        })
    },
  }
}
</script>
