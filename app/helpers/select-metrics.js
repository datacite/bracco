import { helper as buildHelper } from '@ember/component/helper';
// import { htmlSafe } from '@ember/template';


export function selectMetrics([ metrics, doi ]) {

  let citations = metrics.citations.filter(obj => {
    return obj.id === doi;
  })[0].count;

  let views = metrics.views.filter(obj => {
    return obj.id ===  doi;
  })[0].count;

  let downloads = metrics.downloads.filter(obj => {
    return obj.id ===  doi;
  })[0].count;

  return Object(
    {
      citations,
      views,
      downloads,
    }
  );
}

export default buildHelper(selectMetrics);
