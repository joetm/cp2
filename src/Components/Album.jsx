/** @flow */
import Immutable from "immutable";
import React, { PureComponent } from "react";

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized';

import AlbumImg from './AlbumImg.jsx';


function randomImgHeight() {
  return Math.floor(270 * Math.random()) + 30;
}





// Array of images with captions
const list = [
  {caption: 'x1', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x2', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x3', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x4', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x5', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x6', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x7', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x8', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x9', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
];







// // https://gist.github.com/bdkent/56c1e6275a3a8bc5124af58e61703895
// const DEFAULT_CELL_HEIGHT = 250;
// const DEFAULT_CELL_SPACING = 10;
// function createFullWidthMasonry(props) {
//     const cellSpacing = props.cellSpacing || DEFAULT_CELL_SPACING;
//     const cellHeight = props.cellHeight || DEFAULT_CELL_HEIGHT;
//     const keyMapper = props.keyMapper || _.identity();

//     const elementRenderer = props.elementRenderer || _.constant(null);

//     function toDynamicCellWidth(width, columns) {
//         const spacing = (columns - 1) * cellSpacing;
//         return Math.floor((width - spacing) / columns);
//     }

//     return React.createClass({
//         propTypes: {
//             elements: React.PropTypes.array.isRequired,
//             columns: React.PropTypes.number.isRequired
//         },
//         getInitialState: function () {
//             return {
//                 width: null
//             };
//         },
//         componentWillReceiveProps: function (nextProps) {
//             var self = this;

//             if (self.props.columns !== nextProps.columns || self.props.elements !== nextProps.elements) {
//                 var width = self.state.width;
//                 if (!_.isNil(width)) {
//                     self._refreshCells(width, nextProps.columns);
//                 }
//             }
//         },
//         _setMasonryRef: function (ref) {
//             var self = this;
//             self._masonry = ref;
//         },
//         _refreshCells: function (width, columns) {
//             var self = this;

//             var columnWidth = toDynamicCellWidth(width, columns);
//             self.setState({
//                 width: width
//             });

//             if (_.isNil(self._cache)) {

//                 self._cache = new CellMeasurerCache({
//                     defaultHeight: cellHeight,
//                     defaultWidth: columnWidth,
//                     fixedWidth: true
//                 });

//                 self._cellPositioner = createMasonryCellPositioner({
//                     cellMeasurerCache: self._cache,
//                     columnCount: columns,
//                     columnWidth: columnWidth,
//                     spacer: cellSpacing
//                 });
//             } else {
//                 self._cache._defaultWidth = columnWidth; // HACKCITY
//                 self._cache.clearAll();
//                 self._cellPositioner.reset({
//                     columnCount: columns,
//                     columnWidth: columnWidth,
//                     spacer: cellSpacing
//                 });
//                 self._masonry.clearCellPositions();
//             }
//             self.forceUpdate();
//         },
//         _onResize: function (props) {
//             var width = props.width;
//             var self = this;
//             self._refreshCells(width, self.props.columns);
//         },
//         render: function () {
//             var self = this;
//             var elements = self.props.elements;
//             var cellCount = _.size(elements);

//             var renderCell = function (props) {
//                 var index = props.index;
//                 var key = props.key;
//                 var style = props.style;
//                 var parent = props.parent;

//                 var element = elements[index];

//                 return (
//                     <CellMeasurer
//                         cache={self._cache}
//                         index={index}
//                         key={key}
//                         parent={parent}
//                     >
//                         <div style={style}>{elementRenderer(element)}</div>
//                     </CellMeasurer>
//                 );
//             };


//             return (
//                 <AutoSizer onResize={self._onResize}>
//                     {
//                         (function (props) {
//                             var height = props.height;
//                             var width = props.width;
//                             if (_.isNil(self._cache)) {
//                                 return null;
//                             } else {
//                                 return (
//                                     <Masonry
//                                         ref={self._setMasonryRef}
//                                         keyMapper={keyMapper}
//                                         cellCount={cellCount}
//                                         cellMeasurerCache={self._cache}
//                                         cellPositioner={self._cellPositioner}
//                                         cellRenderer={renderCell}
//                                         height={height}
//                                         width={width}
//                                     />
//                                 );
//                             }
//                         })
//                     }
//                 </AutoSizer>
//             );
//         }
//     });
// };








// Default sizes help Masonry decide how many images to batch-measure
const defaultValues = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: false
})


const masonryWidth = window.innerWidth;


const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: defaultValues,
  columnCount: 4,
  columnWidth: 200,
  spacer: 10
})


function cellRenderer ({ index, key, parent, style }) {
  const datum = list[index]
  return (
    <CellMeasurer
      cache={defaultValues}
      index={index}
      key={key}
      parent={parent}
    >
      <div style={style}>
        <img
          src={datum.source}
          style={{
            height: datum.imageHeight,
            width: datum.imageWidth
          }}
        />
        <h4>{datum.caption}</h4>
      </div>
    </CellMeasurer>
  )
}



export default class Album extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 200,
      height: 300,
      gutterSize: 10,
      windowScrollerEnabled: false,
      overscanByPixels: 20,
    };
  }

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      windowScrollerEnabled
    } = this.state;

    // TODO
    // const FullWidthMasonry = createFullWidthMasonry();

    return (
        <Masonry
          cellCount={list.length}
          cellMeasurerCache={defaultValues}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          height={600}
          width={masonryWidth}
        />
    );
  }
};
