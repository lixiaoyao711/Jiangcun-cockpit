import axios from 'axios';

// 登录相关
export function login(data) {
  return axios({
    url: 'login',
    method: 'post',
    data,
  });
}

// 根据类型查询指标表格列表
export function IndicatorSetTableTrendsList(keyName, params = null) {
  return axios({
    url: `/Indicator/setTable/trends/${keyName}/list`,
    method: 'get',
    params,
  });
}

// 树形查询点位类型列表
export function mapPointTypeTreeList() {
  return axios({
    url: `/map/pointType/treeList`,
    method: 'get',
  });
}
// 查询点位信息列表
export function mapPointDataList(ids) {
  return axios({
    url: `/map/pointData/list`,
    method: 'get',
    params: { ids },
  });
}

//查询急救普及列表 类型(1.救护人员培训,2.普及培训)
export function IndicatorFirstAidPopularizationList(params = null) {
  return axios({
    url: '/Indicator/firstAidPopularization/list',
    method: 'get',
    params,
  });
}
//查询暖心家庭列表 类型(1.活动预告信息,2.橙色暖心桥,特殊家庭服务管理)
export function IndicatorWarmFamilyList(params = null) {
  return axios({
    url: '/Indicator/warmFamily/list',
    method: 'get',
    params,
  });
}
//查询特色工作列表 类型1.数字党建,2.数字政府,3.数字经济,4.数字社会,5.数字文化,6.数字法治
export function IndicatorFeaturedWorkList(params = null) {
  return axios({
    url: '/Indicator/featuredWork/list',
    method: 'get',
    params,
  });
}

// 查询值班领导列表
export function IndicatorDutyCalendarLeaderList(params) {
  return axios({
    url: '/Indicator/dutyCalendarLeader/list',
    method: 'get',
    params,
  });
}
// 查询值班人员列表
export function IndicatorDutyCalendarPersonnelList(params) {
  return axios({
    url: '/Indicator/dutyCalendarPersonnel/list',
    method: 'get',
    params,
  });
}
// 查询政治协商列表   类型1.协商党员,2.协商驿站,3.协商活动
export function IndicatorPoliticalConsultationList(params) {
  return axios({
    url: '/Indicator/politicalConsultation/list',
    method: 'get',
    params,
  });
}
// 查询龙舟陈列馆列表
export function IndicatorDragonBoatDisplayList(params) {
  return axios({
    url: '/Indicator/dragonBoatDisplay/list',
    method: 'get',
    params,
  });
}
// 查询五级人员列表
export function IndicatorLevelFivePowerList(params) {
  return axios({
    url: '/Indicator/levelFivePower/list',
    method: 'get',
    params,
  });
}
// 查询综合执法队伍列表
export function IndicatorEnforcementTeamList(params) {
  return axios({
    url: '/Indicator/enforcementTeam/list',
    method: 'get',
    params,
  });
}
// 查询街道民生实事列表
export function IndicatorPeopleLivelihoodList(params) {
  return axios({
    url: '/Indicator/peopleLivelihood/list',
    method: 'get',
    params,
  });
}
// 获取街道民生实事大屏统计信息
export function IndicatorPeopleLivelihoodBsInfo(params) {
  return axios({
    url: '/Indicator/peopleLivelihood/bsInfo',
    method: 'get',
    params,
  });
}
// 查询五水共治列表
export function IndicatorFiveWaterTreatmentList(params) {
  return axios({
    url: '/Indicator/fiveWaterTreatment/list',
    method: 'get',
    params,
  });
}
// 获取五水共治大屏统计信息
export function IndicatorFiveWaterTreatmentBsInfo(params) {
  return axios({
    url: '/Indicator/fiveWaterTreatment/bsInfo',
    method: 'get',
    params,
  });
}
// 查询垃圾分类列表
export function IndicatorRefuseClassificationList(params) {
  return axios({
    url: '/Indicator/refuseClassification/list',
    method: 'get',
    params,
  });
}
// 查询垃圾分类统计信息
export function IndicatorRefuseClassificationGetBsInfo(params) {
  return axios({
    url: '/Indicator/refuseClassification/getBsInfo',
    method: 'get',
    params,
  });
}
// 查询生态环保列表
export function IndicatorEcologyList(params) {
  return axios({
    url: '/Indicator/ecology/list',
    method: 'get',
    params,
  });
}
// 获取生态环保大屏统计信息
export function IndicatorEcologyBsInfo(params) {
  return axios({
    url: '/Indicator/ecology/bsInfo',
    method: 'get',
    params,
  });
}
// 查询人才引进列表
export function IndicatorTalentIntroductionList(params) {
  return axios({
    url: '/Indicator/talentIntroduction/list',
    method: 'get',
    params,
  });
}
// 查询高校经济项目列表
export function IndicatorCollegeEconomyList(params) {
  return axios({
    url: '/Indicator/collegeEconomy/list',
    method: 'get',
    params,
  });
}
// 获取高校经济项统计信息
export function IndicatorCollegeEconomyGetBsInfo(params) {
  return axios({
    url: '/Indicator/collegeEconomy/getBsInfo',
    method: 'get',
    params,
  });
}
// 获取大屏根据行业类别统计
export function IndicatorCollegeEconomyGetBsInfoByIndustrType(params) {
  return axios({
    url: '/Indicator/collegeEconomy/getBsInfoByIndustrType',
    method: 'get',
    params,
  });
}
// 获取大屏根据项目类别统计
export function IndicatorCollegeEconomyGetBsInfoByProjectType(params) {
  return axios({
    url: '/Indicator/collegeEconomy/getBsInfoByProjectType',
    method: 'get',
    params,
  });
}
// 查询成长驿站活动列表
export function IndicatorGrowthPosthouseList(params) {
  return axios({
    url: '/Indicator/growthPosthouse/list',
    method: 'get',
    params,
  });
}

// 查询法治政府列表
export function mapGovernmentList(params) {
  return axios({
    url: '/map/government/list',
    method: 'get',
    params,
  });
}
// 查询数字文化列表
export function mapDigitalCultureList(params) {
  return axios({
    url: '/map/digitalCulture/list',
    method: 'get',
    params,
  });
}
// 查询数字社会列表
export function mapDigitalSocietyList(params) {
  return axios({
    url: '/map/digitalSociety/list',
    method: 'get',
    params,
  });
}
// 查询经济园区列表
export function mapEconomicParkList(params) {
  return axios({
    url: '/map/economicPark/list',
    method: 'get',
    params,
  });
}
// 查询党建驿站列表
export function mapPostStationList(params) {
  return axios({
    url: '/map/postStation/list',
    method: 'get',
    params,
  });
}
// 根据社区查询网格力量列表
export function mapRridPowerGetListByCommunity(params) {
  return axios({
    url: '/map/gridPower/getListByCommunity',
    method: 'get',
    params,
  });
}
// 查询门户首页列表
export function mapIndexList(params) {
  return axios({
    url: '/map/index/list',
    method: 'get',
    params,
  });
}
// 查询值班日历列表
export function dndicatorDutyCalendarList(params) {
  return axios({
    url: 'Indicator/dutyCalendar/list',
    method: 'get',
    params,
  });
}

// 查询指标树列表(Map)
export function indicatorSetTreMapList(params) {
  return axios({
    url: '/Indicator/setTree/mapList',
    method: 'get',
    params,
  });
}
// 查询争星晋位列表
export function IndicatorPositionStarList(params = null) {
  return axios({
    url: '/Indicator/positionStar/list',
    method: 'get',
    params,
  });
}
// 查询月查季督年考列表
export function IndicatorAnnualInspectionList(params = null) {
  return axios({
    url: '/Indicator/annualInspection/list',
    method: 'get',
    params,
  });
}
// 查询清廉护蒋列表
export function IndicatorIncorruptibleProtectionList(params = null) {
  return axios({
    url: '/Indicator/incorruptibleProtection/list',
    method: 'get',
    params,
  });
}
// 查询组工影响力列表
export function IndicatorOrganizationalInfluenceList(params = null) {
  return axios({
    url: '/Indicator/organizationalInfluence/list',
    method: 'get',
    params,
  });
}
// 查询党员教育列表
export function IndicatorPartyMemberEducationList(params = null) {
  return axios({
    url: '/Indicator/partyMemberEducation/list',
    method: 'get',
    params,
  });
}
// 查询晾晒比学列表
export function IndicatorAiringComparisonList(params = null) {
  return axios({
    url: '/Indicator/airingComparison/list',
    method: 'get',
    params,
  });
}
// 查询党员画像列表
export function IndicatorPortraitPartyMembersList(params = null) {
  return axios({
    url: '/Indicator/portraitPartyMembers/list',
    method: 'get',
    params,
  });
}
// 查询品牌强蒋列表
export function IndicatorStrongBrandList(params = null) {
  return axios({
    url: '/Indicator/strongBrand/list',
    method: 'get',
    params,
  });
}

// 查询赛马场分数排名
export function forestSmcfs(params = null) {
  return axios({
    url: '/forest/smcfs',
    method: 'get',
    params,
  });
}
// 查询舆情管控列表
export function forestYqgk(params = null) {
  return axios({
    url: '/forest/yqgk',
    method: 'get',
    params,
  });
}
// 试点推广列表
export function forestSdtg(params = null) {
  return axios({
    url: '/forest/sdtg',
    method: 'get',
    params,
  });
}
// 任务约稿列表
export function forestRwyg(params = null) {
  return axios({
    url: '/forest/rwyg',
    method: 'get',
    params,
  });
}
// 批示肯定列表
export function forestPskd(params = null) {
  return axios({
    url: '/forest/pskd',
    method: 'get',
    params,
  });
}
// 其他列表
export function forestOther(params = null) {
  return axios({
    url: '/forest/other',
    method: 'get',
    params,
  });
}
// 媒体报道列表
export function forestMtbd(params = null) {
  return axios({
    url: '/forest/mtbd',
    method: 'get',
    params,
  });
}
// 典型发言列表
export function forestDxfy(params = null) {
  return axios({
    url: '/forest/dxfy',
    method: 'get',
    params,
  });
}
// 表彰荣誉列表
export function forestBzry(params = null) {
  return axios({
    url: '/forest/bzry',
    method: 'get',
    params,
  });
}

// 查询1.重大活动,2.新乡贤代表
export function IndicatorMajorEventsList(params = null) {
  return axios({
    url: '/Indicator/majorEvents/list',
    method: 'get',
    params,
  });
}
// 查询群团集市列表
export function IndicatorGroupBazaarList(params = null) {
  return axios({
    url: '/Indicator/groupBazaar/list',
    method: 'get',
    params,
  });
}
// 查询群团活动风采列表
export function IndicatorGroupActivityStyleList(params = null) {
  return axios({
    url: '/Indicator/groupActivityStyle/list',
    method: 'get',
    params,
  });
}

//查询文体团队列表  类型(1.街道文体团队,2.社区文体团队)
export function IndicatorSportsTeamList(params = null) {
  return axios({
    url: '/Indicator/sportsTeam/list',
    method: 'get',
    params,
  });
}
//查询开展活动列表
export function IndicatorNumberActivitiesList(params = null) {
  return axios({
    url: '/Indicator/numberActivities/list',
    method: 'get',
    params,
  });
}
//查询社区检查排名列表
export function IndicatorCommunityCheckRankingList(params = null) {
  return axios({
    url: '/Indicator/communityCheckRanking/list',
    method: 'get',
    params,
  });
}
//查询蒋村好人列表
export function IndicatorGoodManList(params = null) {
  return axios({
    url: '/Indicator/goodMan/list',
    method: 'get',
    params,
  });
}
//查询媒体宣传每月排名列表
export function IndicatorMonthlyRankingList(params = null) {
  return axios({
    url: '/Indicator/monthlyRanking/list',
    method: 'get',
    params,
  });
}
//查询文脉传承列表 1.非遗代表性项目2.非遗代表性传承人3.非遗活动展示
export function IndicatorCulturalHeritageList(params = null) {
  return axios({
    url: '/Indicator/culturalHeritage/list',
    method: 'get',
    params,
  });
}
//查询学习强国列表
export function IndicatorStudyPowerList(params = null) {
  return axios({
    url: '/Indicator/studyPower/list',
    method: 'get',
    params,
  });
}
//查询文创发展列表 类型(1.重点企业,2.获奖情况)
export function IndicatorCulturalDevelopmentList(params = null) {
  return axios({
    url: '/Indicator/culturalDevelopment/list',
    method: 'get',
    params,
  });
}
//蒋村街道人员特困残疾低保人数统计信息
export function getForestTkcjdbtjxx(params = null) {
  return axios({
    url: '/forest/tkcjdbtjxx',
    method: 'get',
    params,
  });
}

//蒋村街道一键养老机构数量信息
export function getForestJgslxx(params = null) {
  return axios({
    url: '/forest/jgslxx',
    method: 'get',
    params,
  });
}
//蒋村街道一键养老志愿者活动信息
export function getForestZyzhdxx(params = null) {
  return axios({
    url: '/forest/zyzhdxx',
    method: 'get',
    params,
  });
}

//蒋村街道一键养老课堂课程点击数量信息
export function getForestKcdjs(params = null) {
  return axios({
    url: '/forest/kcdjs',
    method: 'get',
    params,
  });
}

//蒋村街道退役军人走访信息
export function getForestTyjrzfxx(params = null) {
  return axios({
    url: '/forest/tyjrzfxx',
    method: 'get',
    params,
  });
}
//蒋村街道高龄普惠人数统计信息
export function getForestTjxx(params = null) {
  return axios({
    url: '/forest/tjxx',
    method: 'get',
    params,
  });
}
//省回流数据接口_低保边缘在册主表信息
export function getForestShlsj(params = null) {
  return axios({
    url: '/forest/shlsj',
    method: 'get',
    params,
  });
}
//查询事件中心列表
export function getEventList(params = null) {
  return axios({
    url: '/event/event/list',
    method: 'get',
    params,
  });
}
//获取事件中心详细信息
export function getEvent(id) {
  return axios({
    url: `/event/event/${id}`,
    method: 'get',
  });
}
//获取每日-系统事件统计
export function getEventStatisticsByDay(params = null) {
  return axios({
    url: `/event/event/getEventStatisticsByDay`,
    method: 'get',
    params,
  });
}
//蒋村街道退役军人局送喜报表信息
export function getForestSxbbtjxx(params = null) {
  return axios({
    url: `/forest/sxbbtjxx`,
    method: 'get',
    params,
  });
}
//蒋村街道企业宽表地址统计信息
export function getForestQydztjxx(params = null) {
  return axios({
    url: `/forest/qydztjxx`,
    method: 'get',
    params,
  });
}
