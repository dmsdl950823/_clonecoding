<template>
  <base-layout>
    <ion-toolbar class="alert-list-toolbar">
      <close-icon
        class="close-icon title-padding"
        :width="30"
        :height="30"
        @click="close"
      />
      <div class="title">
        <ion-title>알림 내역</ion-title>
      </div>
    </ion-toolbar>
    <!-- 헤더 -->

    <ion-content>
      <ion-list class="alert-list ion-no-padding">
        <ion-list-header class="header -current">
          <ion-label>현재 상태 알림</ion-label>
        </ion-list-header>

        <ion-item
          class="-list"
          v-for="(item, idx) in currentStatusAlert"
          :key="item + idx"
          :inset="false"
          lines="none"
        >
          <div class="contents">
            <ion-label class="-label">
              {{ item }}
            </ion-label>
            <ion-note class="-note">
              보기
            </ion-note>
          </div>
        </ion-item>
      </ion-list>
      <!-- /. 현재 상태 알림 -->

      <ion-list class="alert-list ion-no-padding">
        <ion-list-header
          class="header"
          style="background-color: #F5F5F5"
        >
          <ion-label>과거 알림내역</ion-label>
        </ion-list-header>

        <ion-item
          class="-list"
          v-for="item in priorAlerts"
          :key="`item_${item.index}`"
          :inset="false"
          lines="none"
        >
          <div class="contents">
            <!-- {{ item.index }} -->
            <ion-label class="-label">
              {{ item.message }}
            </ion-label>
            <ion-note class="-date">
              {{ item.date }}
            </ion-note>
          </div>
        </ion-item>
      </ion-list>
      <!-- /. 과거 알림 내역 -->


      <ion-infinite-scroll
        @ionInfinite="loadData($event)" 
        threshold="10%" 
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="circular"
          loading-text="Loading more data..."
        />
      </ion-infinite-scroll>
    </ion-content>
  </base-layout>
</template>

<script>
import CloseIcon from '../../components/Icons/CloseIcon'

export default {
  name: 'AlertList',
  emits: [ 'close-modal' ],
  components: {
    'close-icon': CloseIcon
  },
  methods: {
    toggleInfiniteScroll () {
      this.isDisabled = !this.isDisabled
    },
    // 🌸  ====== from here!!!
    pushData () {
      const max = this.priorAlerts.length + 20;
      const min = max - 20;
      for (let i = min; i < max; i++) {
        if (!this.sampleData[i]) return
        this.sampleData[i].index = i
        this.priorAlerts.push(this.sampleData[i]);
      }
    },
    loadData (ev) {
      setTimeout(() => {
        this.pushData()
        console.log('Loaded data');
        ev.target.complete();

        if (this.priorAlerts.length === this.sampleData.length) {
          console.log('리스트의 끝이야~')
          this.isDisabled = true
        }
      }, 500);
    },
    // 🌸  // ====== to here!!!
    close () {
      // 뒤로가기 기능 추가
    }
  },
  mounted () {
    this.pushData()
  },
  data () {
    return {
      isDisabled: false,
      currentStatusAlert: [
        '고객님께 수화물 전달이 완료되었습니다. 기사님에 대한 평가 부탁드립니다.'
      ],
      priorAlerts: [],
      sampleData: [
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다. '},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다. 수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '테스트테스트 딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다. '},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다. 수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '테스트테스트 딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다. '},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다. 수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '테스트테스트 딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다. '},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다. 수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'},
        { date: '2021-07-6', message: '수화물 전달을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물을 안전하게 보관 시작하였습니다. 즐거운 여행 되세요.'},
        { date: '2021-07-6', message: '수화물 픽업을 위해 기사님이 고객님의 위치에 5분 후 도착합니다.'},
        { date: '2021-07-6', message: '고객님의 수화물 픽업을 위하여 기사님이 출발하였습니다.'},
        { date: '2021-07-6', message: '기사님이 매칭이 성공하였습니다.'},
        { date: '2021-07-6', message: '테스트테스트 딜리카 서비스 신청이 완료되었습니다. 기사님 매칭 중입니다.'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-list-toolbar {
  position: relative;
  display: flex;
  align-items: center;

  .close-icon {
    display: block;
    position: absolute;
    top: 15px; left: 5vw;
    width: 30px;
    padding: 0;
  }

  .title {
    text-align: center;
    font-size: 20px;
  }
}

.alert-list {
  .header {
    border-bottom: 1px solid $grayDE;
    font-weight: bold;
    &.-current { color: $main-orange; }
  }

  .-list {
    border-bottom: 1px solid $grayDE;

    .contents {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1.2em 0;
      .-label {

        line-height: 1.5em;
        height: 3em;
        overflow: hidden;
        // white-space: nowrap;
        white-space: pre-line;
        text-overflow: ellipsis;
        font-size: 14px;
        width: 70vw;
        // height: 3em;
        // line-height: 1.2em;
        // line-break: auto;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
      }
      .-date {
        font-size: 12px;
        color: $text-color;
      }
      .-note {
        font-size: 12px;
        color: $main-orange;
        font-weight: bold;
      }
    }
  }
}
</style>