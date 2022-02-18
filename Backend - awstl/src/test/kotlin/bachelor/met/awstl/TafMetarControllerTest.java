package bachelor.met.awstl;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

import bachelor.met.awstl.controller.TafMetarController;
import bachelor.met.awstl.dto.TafMetarDto;
import bachelor.met.awstl.service.TafMetarService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {TafMetarController.class})
@ExtendWith(SpringExtension.class)
class TafMetarControllerTest {
    @Autowired
    private TafMetarController tafMetarController;

    @MockBean
    private TafMetarService tafMetarService;

    @Test
    void testGetTafMetar() throws Exception {
        TafMetarDto tafMetarDto = new TafMetarDto();
        tafMetarDto.setMetar("<set-?>");
        tafMetarDto.setTaf("<set-?>");
        when(this.tafMetarService.getMetar((String) any())).thenReturn(tafMetarDto);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/tafmetar/{icao}", "Icao");
        MockMvcBuilders.standaloneSetup(this.tafMetarController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"taf\":\"<set-?>\",\"metar\":\"<set-?>\"}"));
    }

    @Test
    void testGetTafMetar2() throws Exception {
        when(this.tafMetarService.getMetar((String) any())).thenThrow(new IllegalArgumentException("?"));
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/tafmetar/{icao}", "Icao");
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(this.tafMetarController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(400))
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("?"));
    }
}

