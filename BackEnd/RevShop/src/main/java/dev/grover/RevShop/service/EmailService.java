package dev.grover.RevShop.service;

import dev.grover.RevShop.entity.Cart;
import dev.grover.RevShop.entity.Order;
import dev.grover.RevShop.entity.Product;
import dev.grover.RevShop.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    ProductService productService;

    final String subject = "Your Order Details From RevShop";

    public void sendSimpleMessage(User user, List<Cart> items, Order order) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("revshop.order@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(formatOrders(items,user, order));
        mailSender.send(message);
    }

    private String formatOrders(List<Cart> items, User u,  Order o){
        //header of the email
        String header = "Thank You for ordering from RevShop! \n Here is a overview of your order:\n";

        //Quick order Details
        String order_overview = "Order For: " + u.getFirst_name() + " " + u.getLast_name()
                + "\nOrder Number: " + o.getID()
                + "\nShipping Address: \n\t" + o.getStreet() + " \n\t\t" + o.getCity() + " " + o.getState()
                + ", " + o.getZip()
                +"\nOrder Total: \t$" + o.getTotal();

        String footer = "Thank You for choosing Revshop! \nWe hope to see you soon!";
        return header + order_overview + buildHtmlTable(items) + footer;
    }
    private String buildHtmlTable(List<Cart> items) {

        String header =  "<html>" +
                "<body>" +
                "<h1>Welcome!</h1>" +
                "<table style='border:1px solid black'>" +
                "<tr>" +
                "<th style='border:1px solid black'>Item</th>" +
                "<th style='border:1px solid black'>Quantity</th>" +
                "<th style='border:1px solid black'>Price</th>" +
                "</tr>";
        StringBuilder content = new StringBuilder();
        for(Cart item : items){
            Product p = productService.getProductById(item.getProduct_id());
            content.append("<tr>" + "<td style='border:1px solid black'>").append(p.getProduct_name()).append("</td>")
                    .append("<td style='border:1px solid black'>").append(item.getQuantity()).append("</td>")
                    .append("<td style='border:1px solid black'>").append(p.getPrice()).append("</td>")
                    .append("</tr>");
        }

                String footer =
                "</table>" +
                "</body>" +
                "</html>";

        return header + content + footer;
    }
}
