import Routes from './routes/routes';
import BaseLayout from './layout/BaseLayout';
import GlobalStyles from '@mui/material/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          'body::-webkit-scrollbar, *::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
            background: 'transparent', /* make scrollbar transparent */
            display: 'none',
          },
          'body, *': {
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',   /* Firefox */
          },
          'body': {
            overflow: 'auto',         /* Allow scrolling */
            overscrollBehavior: 'none', /* Prevent bounce effect on some browsers */
          },
          '#root': {
            height: '100%',
            overflowY: 'auto',        /* Allow vertical scrolling */
          }
        }}
      />
      <BaseLayout>
        <Routes />
      </BaseLayout>

    </>
  );
}

export default App;
