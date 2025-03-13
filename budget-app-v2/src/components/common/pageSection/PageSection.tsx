import './pageSection.style.scss';

const PageSection = ({children}:{children:JSX.Element}) =>{
    return <section className="content-layout">{children}</section>
}

export default PageSection;