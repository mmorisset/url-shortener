import utils from 'packs/utils';
import c3 from 'c3';
import moment from 'moment';

const CHART_ELEMENT = "#chart"

utils.whenPageReadyIfExists(CHART_ELEMENT, () => {

  let activity = $(CHART_ELEMENT).data('activity');

  const dates = activity[0].map((date) => moment.utc(date));
  dates.unshift('x');

  const counts = activity[1];
  counts.unshift('Activity');

  const chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      xFormat: '%Y-%m-%d %H:%M:%S',
      columns: [
        dates,
        counts
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        localtime: true,
        tick: {
          format: '%Y-%m-%d %H:%M:%S'
        }
      }
    }
  });
});



