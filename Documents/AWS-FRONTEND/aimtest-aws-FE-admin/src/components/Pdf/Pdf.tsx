import React, { useEffect, useState } from 'react';
import fileDownload from 'react-file-download';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as Plotly from 'plotly.js';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

let graphData1: number[];
let graphData2: number[];
let graphData3: number[];
let graphData4: number[];
let graphData5: number[];
let graphData6: number[];
let segmentElementReport: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let firstSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let secondSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let thirdSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let fourthSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let fifthSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let sixthSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];
let seventhSegmentData: {
  segmentName?: string;
  name: string;
  percentage: string;
}[];

const DynamicPdf = () => {
  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );

  const segmentElementData = useSelector(
    (state: RootState) =>
      state?.segmentElement?.segmentElementData?.segmentElements
  );

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  graphData1 = [];
  graphData2 = [];
  graphData3 = [];
  graphData4 = [];
  graphData5 = [];
  graphData6 = [];

  const graphValues1 = ['MEMORY SKILLS', 'CONCENTRATION', 'READING SKILLS'];
  const graphValues2 = ['GRASPING SKILLS', 'WRITING SKILLS', 'Calculation'];
  const graphValues3 = [
    'COGNATIVE QUOTIENT',
    'ADVERSITY QUOTIENT',
    'VISIONARY QUOTIENT',
    'EMOTIONAL QUOTIENT',
    'INTELLIGENCE QUOTIENT',
  ];
  const graphValues4 = [
    'KINESTHTIC LEARNING',
    'READ AND UNDERSTAND LEARNING',
    'AUDITORY LEARNING',
    'VISUAL LEARNING',
  ];
  const graphValues5 = [
    'BUSINESS APPROACH THINKER',
    'POSITIVE THINKER',
    'NEGATIVE THINKER',
    'EMOTIONAL THINKER',
    'CRITICAL THINKER',
    'SCIENTIFIC THINKER',
  ];
  const graphValues6 = ['CREATIVE PERSONALITY', 'LOGICAL PERSONALITY'];

  const sampleReport = [
    {
      elementName: 'CHEMISTRY',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'CONCENTRATION',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'MEMORY SKILLS',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'WRITING SKILLS',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'GRASPING SKILLS',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'CREATIVE PERSONALITY',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'LOGICAL PERSONALITY',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'COGNATIVE QUOTIENT',
      totalQuestion: 3,
      percentage: 24,
    },
    {
      elementName: 'ADVERSITY QUOTIENT',
      totalQuestion: 3,
      percentage: 84,
    },
    {
      elementName: 'VISIONARY QUOTIENT',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'EMOTIONAL QUOTIENT',
      totalQuestion: 3,
      percentage: 50,
    },
    {
      elementName: 'INTELLIGENCE QUOTIENT',
      totalQuestion: 3,
      percentage: 30,
    },
    {
      elementName: 'BUSINESS APPROACH THINKER',
      totalQuestion: 3,
      percentage: 24,
    },
    {
      elementName: 'POSITIVE THINKER',
      totalQuestion: 3,
      percentage: 84,
    },
    {
      elementName: 'NEGATIVE THINKER',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'CRITICAL THINKER',
      totalQuestion: 3,
      percentage: 50,
    },
    {
      elementName: 'SCIENTIFIC THINKER',
      totalQuestion: 3,
      percentage: 30,
    },
    {
      elementName: 'EMOTIONAL THINKER',
      totalQuestion: 3,
      percentage: 30,
    },
    {
      elementName: 'KINESTHTIC LEARNING',
      totalQuestion: 3,
      percentage: 64,
    },
    {
      elementName: 'READ AND UNDERSTAND LEARNING',
      totalQuestion: 3,
      percentage: 50,
    },
    {
      elementName: 'AUDITORY LEARNING',
      totalQuestion: 3,
      percentage: 30,
    },
    {
      elementName: 'VISUAL LEARNING',
      totalQuestion: 3,
      percentage: 30,
    },
  ];

  const a = sampleReport.filter((item) =>
    graphValues1.includes(item.elementName)
  );
  const b = sampleReport.filter((item) =>
    graphValues2.includes(item.elementName)
  );
  const c = sampleReport.filter((item) =>
    graphValues3.includes(item.elementName)
  );
  const d = sampleReport.filter((item) =>
    graphValues4.includes(item.elementName)
  );
  const e = sampleReport.filter((item) =>
    graphValues5.includes(item.elementName)
  );
  const f = sampleReport.filter((item) =>
    graphValues6.includes(item.elementName)
  );

  graphValues1?.map((item) => {
    const a1 = a.filter((item1) => item1.elementName === item);
    if (a1?.length > 0) {
      graphData1.push(a1[0].percentage);
    } else {
      graphData1.push(0);
    }
  });
  graphValues2?.map((item) => {
    const a1 = b.filter((item1) => item1.elementName === item);
    if (a1?.length > 0) {
      graphData2.push(a1[0].percentage);
    } else {
      graphData2.push(0);
    }
  });
  graphValues3?.map((item) => {
    const a1 = c.filter((item1) => item1.elementName === item);
    if (a1?.length > 0) {
      graphData3.push(a1[0].percentage);
    } else {
      graphData3.push(0);
    }
  });
  graphValues4?.map((item) => {
    const a1 = d.filter((item1) => item1.elementName === item);
    if (a1?.length > 0) {
      graphData4.push(a1[0].percentage);
    } else {
      graphData4.push(0);
    }
  });
  graphValues5?.map((item) => {
    const a1 = e.filter((item1) => item1.elementName === item);
    if (a1?.length > 0) {
      graphData5.push(a1[0].percentage);
    } else {
      graphData5.push(0);
    }
  });
  graphValues6?.map((item) => {
    const a1 = f.filter((item1) => item1.elementName === item);
    if (a1?.length > 0) {
      graphData6.push(a1[0].percentage);
    } else {
      graphData5.push(0);
    }
  });

  const elementReport = elementData?.map((item: { name: string }) => {
    const p = sampleReport.find((item1) => item1.elementName === item.name);
    if (p !== undefined) {
      return {
        name: p.elementName,
        percentage: String(p.percentage + '%'),
      };
    } else {
      return {
        name: item.name,
        percentage: '0%',
      };
    }
  });

  segmentElementReport = [];
  firstSegmentData = [];
  secondSegmentData = [];
  thirdSegmentData = [];
  fourthSegmentData = [];
  fifthSegmentData = [];
  sixthSegmentData = [];
  seventhSegmentData = [];

  segmentElementData.map(
    (item: { segment: { name: string; element: { name: string }[] } }) => {
      item?.segment?.element?.map((item1) => {
        const p = sampleReport.find(
          (item2) => item2.elementName === item1.name
        );
        if (p !== undefined) {
          segmentElementReport?.push({
            segmentName: item.segment.name,
            name: p.elementName,
            percentage: String(p.percentage + '%'),
          });
        } else {
          segmentElementReport?.push({
            segmentName: item.segment.name,
            name: item1.name,
            percentage: '0%',
          });
        }
      });
    }
  );

  segmentElementData?.map(
    (item: { segment: { name: string } }, index: number) => {
      segmentElementReport?.map((item1) => {
        if (item1.segmentName === item.segment.name) {
          index === 0
            ? firstSegmentData.push(item1)
            : index === 1
            ? secondSegmentData.push(item1)
            : index === 2
            ? thirdSegmentData.push(item1)
            : index === 3
            ? fourthSegmentData.push(item1)
            : index === 4
            ? fifthSegmentData.push(item1)
            : index === 5
            ? sixthSegmentData.push(item1)
            : index === 6 && seventhSegmentData.push(item1);
        }
      });
    }
  );

  const elementCoordinates = [
    506, 450, 394, 338, 283, 227, 171, 115, 59, -1, 493, 437, 382, 326, 271,
    215, 159, 103, 47, 10, 506, 450, 394, 338, 283, 227, 171, 115, 59, -1, 493,
    437, 382, 326, 271, 215, 159, 103, 47, 10, 506, 450, 394, 338, 283, 227,
    171, 115, 59, -1, 493, 437, 382, 326, 271, 215, 159, 103, 47, 10, 506, 450,
    394, 338, 283, 227, 171, 115, 59, -1, 493, 437, 382, 326, 271, 215, 159,
    103, 47, 10,
  ];

  const modify = async () => {
    const dataPie = ([] = [
      {
        values: graphData1,
        labels: ['Memory', 'Concentration', 'Reading Speed'],
        type: 'pie',
      },
    ]);

    const layout = {
      height: 500,
      width: 600,
    };

    Plotly.newPlot('graph', dataPie, layout)
      .then((gd: HTMLDivElement) => {
        return Plotly.toImage(gd);
      })
      .then(async (dataUri: string) => {
        const dataPie1 = ([] = [
          {
            values: graphData2,
            labels: ['Grasping Skill', 'Writing Skill', 'Calculation'],
            type: 'pie',
          },
        ]);

        const layout = {
          height: 500,
          width: 600,
        };

        Plotly.newPlot('graph1', dataPie1, layout)
          .then((gd: HTMLDivElement) => {
            return Plotly.toImage(gd);
          })
          .then(async (dataUri1: string) => {
            const dataBar = ([] = [
              {
                type: 'bar',
                x: graphData3,
                y: [
                  'Cognitive <br>Quotient(CQ)',
                  'Adverse <br>Quotient(AQ)',
                  'Visionary <br>Quotient(VQ)',
                  'Emotional <br>Quotient(EQ)',
                  'Intelligence <br>Quotient(IQ)',
                ],
                marker: {
                  color: [
                    '#B87333',
                    '#C0C0C0',
                    '#FAD702',
                    '#36A2B8',
                    '#E5E4E2',
                  ],
                  width: 1,
                },

                orientation: 'h',
              },
            ]);
            const layout = {
              title: 'MULTIPLE INTELLIGENCE REPORT',
              height: 450,
              width: 800,
            };
            Plotly.newPlot('graph1', dataBar, layout)
              .then((gd: HTMLDivElement) => {
                return Plotly.toImage(gd);
              })
              .then(async (dataUri2: string) => {
                const dataBar1 = ([] = [
                  {
                    type: 'bar',
                    x: graphData4,
                    y: [
                      'KINESTHETIC',
                      'READ & <br> UNDERSTAND',
                      'VISUAL ',
                      'AUDITORY ',
                    ],
                    marker: {
                      color: [
                        '#B87333',
                        '#C0C0C0',
                        '#FAD702',
                        '#36A2B8',
                        '#E5E4E2',
                      ],
                      width: 1,
                    },

                    orientation: 'h',
                  },
                ]);
                const layout = {
                  height: 450,
                  width: 750,
                  title: 'Learning Style',
                };
                Plotly.newPlot('graph1', dataBar1, layout)
                  .then((gd: HTMLDivElement) => {
                    return Plotly.toImage(gd);
                  })
                  .then(async (dataUri3: string) => {
                    const dataBar2 = ([] = [
                      {
                        type: 'bar',
                        x: graphData5,
                        y: [
                          'Business <br>Approach <br>Thinker',
                          'Positive <br>Thinker',
                          'Negative <br>Thinker',
                          'Emotional <br>Thinker',
                          'Critical <br>Thinker',
                          'Scientific <br>Thinker',
                        ],
                        marker: {
                          color: [
                            '#B87333',
                            '#C0C0C0',
                            '#FAD702',
                            '#36A2B8',
                            '#E5E4E2',
                            '#B87333',
                          ],
                          width: 1,
                        },

                        orientation: 'h',
                      },
                    ]);
                    const layout = {
                      title: 'THINKING STYLE',
                      height: 550,
                      width: 1000,
                    };

                    Plotly.newPlot('graph1', dataBar2, layout)
                      .then((gd: HTMLDivElement) => {
                        return Plotly.toImage(gd);
                      })
                      .then(async (dataUri4: string) => {
                        const dataPie2 = ([] = [
                          {
                            values: graphData6,
                            labels: [
                              'Memory',
                              'Concentration',
                              'Reading Speed',
                            ],
                            type: 'pie',
                          },
                        ]);

                        const layout = {
                          height: 500,
                          width: 600,
                        };
                        Plotly.newPlot('graph1', dataPie2, layout)
                          .then((gd: HTMLDivElement) => {
                            return Plotly.toImage(gd);
                          })
                          .then(async (dataUri5: string) => {
                            const url =
                              'http://localhost:3000/pdf/pdfeditor.pdf';
                            const graphUrl = dataUri;
                            const graphUrl1 = dataUri1;
                            const graphUrl2 = dataUri2;
                            const graphUrl3 = dataUri3;
                            const graphUrl4 = dataUri4;
                            const graphUrl5 = dataUri5;

                            const existingPdfBytes = await fetch(url).then(
                              (res) => res.arrayBuffer()
                            );

                            const pngImageBytes = await fetch(graphUrl).then(
                              (res) => res.arrayBuffer()
                            );
                            const pngImageBytes1 = await fetch(graphUrl1).then(
                              (res) => res.arrayBuffer()
                            );
                            const pngImageBytes2 = await fetch(graphUrl2).then(
                              (res) => res.arrayBuffer()
                            );
                            const pngImageBytes3 = await fetch(graphUrl3).then(
                              (res) => res.arrayBuffer()
                            );
                            const pngImageBytes4 = await fetch(graphUrl4).then(
                              (res) => res.arrayBuffer()
                            );
                            const pngImageBytes5 = await fetch(graphUrl5).then(
                              (res) => res.arrayBuffer()
                            );

                            const pdfDoc = await PDFDocument.load(
                              existingPdfBytes
                            );
                            const fontt = await pdfDoc.embedFont(
                              StandardFonts.TimesRomanBold
                            );
                            const pages = pdfDoc.getPages();

                            const firstPage = pages[1];
                            const fourteenPage = pages[14];
                            const fifteenPage = pages[15];
                            const twentysixPage = pages[27];
                            const twentysevenPage = pages[28];
                            const twentynindPage = pages[30];
                            const thirtyPage = pages[31];
                            const fiftyfivePage = pages[56];

                            const pngImage = await pdfDoc.embedPng(
                              pngImageBytes
                            );
                            const pngImage1 = await pdfDoc.embedPng(
                              pngImageBytes1
                            );
                            const pngImage2 = await pdfDoc.embedPng(
                              pngImageBytes2
                            );
                            const pngImage3 = await pdfDoc.embedPng(
                              pngImageBytes3
                            );
                            const pngImage4 = await pdfDoc.embedPng(
                              pngImageBytes4
                            );
                            const pngImage5 = await pdfDoc.embedPng(
                              pngImageBytes5
                            );

                            const pngDims = pngImage.scale(0.5);
                            const pngDims1 = pngImage1.scale(0.5);
                            const pngDims2 = pngImage2.scale(0.5);
                            const pngDims3 = pngImage3.scale(0.5);
                            const pngDims4 = pngImage4.scale(0.5);
                            const pngDims5 = pngImage5.scale(0.5);

                            const { width, height } = firstPage.getSize();
                            firstPage.drawText(`Varun Joshi`, {
                              x: width / 13 + 220,
                              y: height / 5 + 353,
                              size: 17,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });
                            firstPage.drawText(`10th`, {
                              x: width / 13 + 220,
                              y: height / 5 + 311,
                              size: 17,
                              font: fontt,
                              color: rgb(0, 0, 0),
                            });
                            firstPage.drawText(`15-10-1996`, {
                              x: width / 13 + 220,
                              y: height / 5 + 271,
                              size: 17,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });
                            firstPage.drawText(`9876543210`, {
                              x: width / 13 + 220,
                              y: height / 5 + 230,
                              size: 17,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });
                            firstPage.drawText(`11/2 Kanadia Road Indore`, {
                              x: width / 13 + 220,
                              y: height / 5 + 189,
                              size: 17,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });
                            firstPage.drawText(`varun.joshi@gmail.com`, {
                              x: width / 13 + 220,
                              y: height / 5 + 148,
                              size: 17,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });

                            fourteenPage.drawImage(pngImage, {
                              x:
                                fourteenPage.getWidth() / 3 -
                                pngDims.width / 1 +
                                240,
                              y:
                                fourteenPage.getHeight() / 2 -
                                pngDims.height -
                                100,
                              width: pngDims.width,
                              height: pngDims.height,
                            });
                            fourteenPage.drawText(`CRM Report`, {
                              x: width / 13 + 80,
                              y: height / 5 + 110,
                              size: 13,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });

                            fifteenPage.drawImage(pngImage1, {
                              x:
                                fifteenPage.getWidth() / 3 -
                                pngDims1.width / 1 +
                                240,
                              y:
                                fifteenPage.getHeight() / 2 -
                                pngDims1.height -
                                100,
                              width: pngDims1.width,
                              height: pngDims1.height,
                            });
                            fifteenPage.drawText(`GWC Report`, {
                              x: width / 13 + 80,
                              y: height / 5 + 110,
                              size: 13,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });

                            twentysixPage.drawImage(pngImage2, {
                              x:
                                twentysixPage.getWidth() / 3 -
                                pngDims2.width / 1 +
                                320,
                              y:
                                twentysixPage.getHeight() / 2 -
                                pngDims2.height +
                                340,
                              width: pngDims2.width - 10,
                              height: pngDims2.height,
                            });

                            twentysevenPage.drawImage(pngImage3, {
                              x:
                                twentysevenPage.getWidth() / 3 -
                                pngDims3.width / 1 +
                                310,
                              y:
                                twentysevenPage.getHeight() / 2 -
                                pngDims3.height -
                                75,
                              width: pngDims3.width,
                              height: pngDims3.height,
                            });

                            twentynindPage.drawImage(pngImage4, {
                              x:
                                twentynindPage.getWidth() / 3 -
                                pngDims4.width / 1 +
                                360,
                              y:
                                twentynindPage.getHeight() / 2 -
                                pngDims4.height +
                                85,
                              width: pngDims4.width,
                              height: pngDims4.height,
                            });

                            thirtyPage.drawText(`Personality Type Report`, {
                              x: width / 13 + 60,
                              y: height / 5 + 280,
                              size: 13,
                              color: rgb(0, 0, 0),
                              font: fontt,
                            });

                            thirtyPage.drawImage(pngImage5, {
                              x:
                                twentynindPage.getWidth() / 3 -
                                pngDims5.width / 1 +
                                260,
                              y:
                                twentynindPage.getHeight() / 2 -
                                pngDims5.height +
                                25,
                              width: pngDims5.width,
                              height: pngDims5.height,
                            });

                            elementReport?.map(
                              (
                                item: { name: string; percentage: string },
                                index: number
                              ) => {
                                pages[19 + Math.floor(index / 10)].drawText(
                                  `${item.percentage}`,
                                  {
                                    x: width / 13 + 410,
                                    y:
                                      index % 10 === 9
                                        ? height / 5 - elementCoordinates[index]
                                        : height / 5 +
                                          elementCoordinates[index],
                                    size: 17,
                                    color: rgb(0, 0, 0),
                                    font: fontt,
                                  }
                                );
                              }
                            );

                            firstSegmentData?.map(
                              (item: { percentage: string }, index: number) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x: width / 13 + 131,
                                  y: height / 5 + (586 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );
                            secondSegmentData.map(
                              (item: { percentage: string }, index: number) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x: width / 13 + 310,
                                  y: height / 5 + (586 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );
                            thirdSegmentData.map(
                              (item: { percentage: string }, index: number) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x: width / 13 + 493,
                                  y: height / 5 + (586 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );
                            fourthSegmentData.map(
                              (
                                item: { percentage: string; name: string },
                                index: number
                              ) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x:
                                    index >= 0 && index <= 9
                                      ? width / 13 + 143
                                      : index >= 10 && index <= 19
                                      ? width / 13 + 310
                                      : width / 13 + 485,
                                  y:
                                    index >= 0 && index <= 9
                                      ? height / 5 + (355 - index * 20)
                                      : index >= 10 && index <= 19
                                      ? height / 5 + (555 - index * 20)
                                      : height / 5 + (753 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );
                            fifthSegmentData.map(
                              (
                                item: { percentage: string; name: string },
                                index: number
                              ) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x:
                                    index >= 0 && index <= 9
                                      ? width / 13 + 136
                                      : width / 13 + 308,
                                  y:
                                    index >= 0 && index <= 9
                                      ? height / 5 + (122 - index * 20)
                                      : height / 5 + (322 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );
                            sixthSegmentData.map(
                              (
                                item: { percentage: string; name: string },
                                index: number
                              ) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x: width / 13 + 490,
                                  y: height / 5 + (122 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );
                            seventhSegmentData.map(
                              (
                                item: { percentage: string; name: string },
                                index: number
                              ) => {
                                fiftyfivePage.drawText(`${item.percentage}`, {
                                  x: width / 13 + 490,
                                  y: height / 5 - (18 - index * 20),
                                  size: 10,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            );

                            const pdfBytes = await pdfDoc.save();
                            fileDownload(
                              pdfBytes,
                              'filename.pdf',
                              'application/pdf'
                            );
                          });
                      });
                  });
              });
          });
      });
  };

  return (
    <>
      {mount && (
        <div>
          <div id='graph' style={{ display: 'none' }}></div>
          <div id='graph1' style={{ display: 'none' }}></div>
          <button onClick={modify}>Click Me</button>
        </div>
      )}
    </>
  );
};

export default DynamicPdf;
