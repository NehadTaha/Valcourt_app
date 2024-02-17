import '../Styles/EventBody.css'

const Card = ({prop}) => {

   const months = {
    '01':'January',
    '02':'Febuary',
    '03':'March',
    '04':'April',
    '05':"May",
    '06':'June',
    '07':'July',
    '08':'August',
    '09':'September',
    '10':'October',
    '11':'November',
    '12':'December'
   }
    
    
    let day = "01"
    let month = "January"
    let year = "2024"

    const setDate = () =>{
       const token = prop.date.split('/')
        day = token[0]
        for(const key in months){
            if(key === token[1]){
                month = months[key]
            }
        }  
        year = token[2]
    }

    setDate()

return (
    <div class="card">
      <p class="title">{prop.title}</p>
      <p class="content">
        {prop.description}
      </p>
      <div class="example-date">
        <span class="day">{day}</span>
        <span class="month">{month}</span>
        <span class="year">{year}</span>
      </div>
      <button>subscribe</button>
    </div>
  );
};

export default Card;
