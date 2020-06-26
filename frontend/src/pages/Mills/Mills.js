import React from "react";
import PageHeader from "../../components/PageHeader";
import heroImg from "../../assets/mills-header.jpg";

function MillsGrid() {
  function calcKey(row) {
    return row.map(mill => mill.id).reduce((acc, cur) => acc + cur)
  }
  
  const mills = [
    [
      {id: '1', name: '100 Mile Lumber - West Fraser', type: 'Mill', region: 'BC'},
      {id: '2', name: '1867 Confederation Log Homes', type: 'Remanufacturer', region: 'ON'},
      {id: '3', name: 'A & A Trading Ltd.', type: 'Wholesalers, Exporters & Brokers', region: 'BC'},
      {id: '4', name: 'A & D Woodturning', type: 'Remanufacturer', region: 'ON'}
    ],
    [
      {id: '5', name: 'A & H Lumber Services Ltd.', type: 'Remanufacturer', region: 'BC'},
      {id: '6', name: 'A & K Millwork Ltd.', type: 'Remanufacturer', region: 'MB'},
      {id: '7', name: 'A & P Manufacturing Ltd.', type: 'Remanufacturer', region: 'NL'},
      // {id: '8', name: 'A.B. Cushing Mills Ltd.', type: 'Mill', region: 'AB'}
    ]
  ]

  const cards = mills.map((millRow) => (
    <div className="tile is-ancestor" key={calcKey(millRow)}>
      <div className="tile is-parent">
        {millRow.map((mill) => (
          <div className="tile is-3 is-child tile__mill" key={mill.id}>
            <div className="card card__mill">
              <div className="card-image">
                <figure className="image is-4by2">
                  <img
                    src="https://placehold.co/1200x600"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  
                  <div className="media-content">
                    <p className="title is-6">{mill.type}</p>
                    <p className="subtitle is-6">{mill.name}</p>
                  </div>
                </div>

                <div className="content">
                  <a>{mill.region}</a>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
  return <div className="container container__mill_cards">{cards}</div>;
}

function Mills() {
  return (
    <div>
      <PageHeader title="Mills" heroImg={heroImg} />
      <MillsGrid />
    </div>
  );
}

export default Mills;
