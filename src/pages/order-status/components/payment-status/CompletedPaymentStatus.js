import { Button, Card } from 'react-bootstrap'
import ImageWithLoading from '../../../../components/ui/ImageWithLoading'
import moment from 'moment';
import nullImage from '../../../../assets/images/imagenotfound.jpeg'
import '../../styles/cardpayment.css'
import 'moment/locale/id';
moment.locale('id')


export default function CompletedPaymentStatus(props) {

  const formatter = new Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  const filteredOrder = props.data?.orders?.filter(o => o.status&& o.slip );


  return (
    <>
      {filteredOrder?.map(o => (
        <Card className='card-status-payment' key={o.id}>
          <Card.Header>
            {!o.status && !o.slip ? "BELUM BAYAR" :
            !o.status&& o.slip ? "SEDANG PROSES" : "SELESAI"}
          
          </Card.Header><Card.Body>
            <div className='row'>
              <div className='col-md-9 card-content-payment'>
                {/* <img className='card-img-payment' src={exampleImg} alt='Example' /> */}
                {o.image === null || o.image === undefined ?
                (
                  <div>
                    <ImageWithLoading
                      src={nullImage}
                      alt={'null'}
                    />
                  </div>
                ) :
                (
                  <div>
                    <ImageWithLoading
                      src={o.image}
                      alt={o.name}
                    />
                  </div>
                )
              }
                <div>
                  <h5>Nama/Type Mobil {o.car?.name} </h5>
                  <h5>tanggal Sewa {moment(o.car?.start_rent_at).format('DD MMMM YYYY')}</h5>
                  <h5>tanggal berakhir sewa {moment(o.car?.finish_rent_at).format('DD MMMM YYYY')}</h5>
                  <p>No pesanan: {o.id}</p>
                </div>
              </div>
              <div className='col-md-3'>
                total bayar: {formatter.format(o.total_price)}
              </div>
            </div>
            
            <div className='payment-option-button'>
                <>
                  <Button variant="primary">Lihat Detail</Button>
                </>
            </div>

          </Card.Body>
        </Card>
      ))}

    </>
  )
}